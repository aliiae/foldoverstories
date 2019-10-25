import django
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient


def post_text_from_client_to_room(text_data, client, room):
    return client.post(reverse('texts-list', kwargs={'room_title': room.room_title}),
                       data=text_data)


class HttpTextsTest(APITestCase):

    def setUp(self):
        django.setup()

        from storymanager.tests_utils import create_user
        from storymanager.tests_utils import login_user_into_client
        from storymanager.tests_utils import create_user_room

        self.client = APIClient()
        self.user = create_user()
        login_user_into_client(self.user, self.client)
        self.room_title = 'a-b'
        self.room = create_user_room(self.user, self.room_title)
        self.full_data = {'visible_text': 'visible_text', 'hidden_text': 'hidden_text'}
        self.visible_only_data = {'visible_text': 'visible_text'}
        self.hidden_only_data = {'hidden_text': 'hidden_text'}

    def test_user_can_write(self):
        response = post_text_from_client_to_room(self.full_data, self.client, self.room)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_user_can_write_text_with_only_visible_part(self):
        response = post_text_from_client_to_room(self.visible_only_data, self.client, self.room)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_user_cannot_write_text_with_only_hidden_part(self):
        response = post_text_from_client_to_room(self.hidden_only_data, self.client, self.room)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_user_cannot_write_empty_text(self):
        response = post_text_from_client_to_room({}, self.client, self.room)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_user_can_view_last_visible_text_in_open_room(self):
        from storymanager.tests_utils import create_user_room_text

        texts = [create_user_room_text(self.user, self.room, visible_text=str(i))
                 for i in range(10)]
        response = self.client.get(
            reverse('texts-list', kwargs={'room_title': self.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertListEqual([texts[-1].visible_text],
                             [t['visible_text'] for t in response.data])

    def test_logged_out_user_can_view_last_visible_text_in_open_room(self):
        from storymanager.tests_utils import create_user_room_text

        texts = [create_user_room_text(self.user, self.room, visible_text=str(i))
                 for i in range(10)]
        self.client.post(reverse('knox_logout'))
        self.client.credentials(HTTP_AUTHORIZATION='')  # need to remove the token first
        response = self.client.get(
            reverse('texts-list', kwargs={'room_title': self.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertListEqual([texts[-1].visible_text],
                             [t['visible_text'] for t in response.data])

    def test_user_can_list_empty_room_with_no_texts(self):
        texts = []
        response = self.client.get(reverse('texts-list', kwargs={'room_title': self.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertListEqual(texts, response.data)

    def test_user_with_one_prev_text_cannot_write_after_another_user_joined(self):
        self._populate_users()
        self._user_writes_n_times(1)
        self._assert_user_can_write(self.user)
        self._another_user_joins_room()
        self._assert_user_cannot_write(self.user)

    def test_user_with_many_prev_texts_cannot_write_after_another_user_joined(self):
        self._populate_users()
        self._user_writes_n_times(2)
        self._assert_user_can_write(self.user)
        self._another_user_joins_room()
        self._assert_user_cannot_write(self.user)

    def test_user_with_no_prev_texts_can_write_after_another_user_joined(self):
        self._assert_user_can_write(self.user, post=False)
        self._another_user_joins_room()
        self._assert_user_can_write(self.user)

    def test_current_turn_user_is_chronologically_after_previous_author(self):
        from storymanager.tests_utils import login_user_into_client

        authors_count = 10
        other_usernames = [f'user-{i}' for i in range(authors_count, 0, -1)]
        first_author_index = authors_count // 2
        users = []
        for i, another_username in enumerate(other_usernames):
            users.append(self._another_user_joins_room(another_username))
            if i == first_author_index:
                post_text_from_client_to_room(self.full_data, self.client, self.room)
        users = [self.user] + users
        exp_current_turn_index = (first_author_index + 1 + 1) % authors_count
        for i, user in enumerate(users):
            login_user_into_client(user, self.client)
            if i < exp_current_turn_index:  # users before are not allowed to write
                self._assert_user_cannot_write(user)
            else:  # users after are allowed to write one after another
                self._assert_user_can_write(user)
                # next user should be correctly named:
                current_turn_username = self._get_current_turn_username()
                self.assertEqual(users[(i + 1) % len(users)].username, current_turn_username)

    def test_user_in_a_single_user_room_can_write_many_times(self):
        for _ in range(10):
            self._assert_user_can_write(self.user)

    def test_user_cannot_write_after_room_is_closed(self):
        self.room.close()
        self._assert_user_cannot_write(self.user, membership_status='stopped')

    def test_user_cannot_write_after_leaving_room(self):
        self.room.leave_room(self.user)
        self._assert_user_cannot_write(self.user, membership_status='stopped')

    # HELPER FUNCTIONS
    def _get_current_turn_username(self):
        rooms_detail_response = self.client.get(
            reverse('rooms-detail', kwargs={'room_title': self.room.room_title}))
        return rooms_detail_response.data.get('current_turn_username')

    def _user_writes_n_times(self, n=1):
        for _ in range(n):
            post_text_from_client_to_room(self.full_data, self.client, self.room)

    def _assert_user_can_write(self, user, post=True):
        from rooms.models import get_user_room_membership, Membership
        from storymanager.tests_utils import login_user_into_client

        login_user_into_client(user, self.client)
        this_membership = get_user_room_membership(user, self.room)
        self.assertTrue(this_membership.status == Membership.CAN_WRITE, this_membership.status)
        if post:
            response = post_text_from_client_to_room(self.full_data, self.client, self.room)
            self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def _assert_user_cannot_write(self, user, membership_status='waiting'):
        from rooms.models import get_user_room_membership, Membership
        from storymanager.tests_utils import login_user_into_client

        membership_status = (Membership.WAITING if membership_status == 'waiting'
                             else Membership.STOPPED)
        login_user_into_client(user, self.client)
        this_membership = get_user_room_membership(user, self.room)
        self.assertTrue(this_membership.status == membership_status, this_membership.status)
        response = post_text_from_client_to_room(self.full_data, self.client, self.room)
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code, response.data)

    def _another_user_joins_room(self, username='another_user') -> 'User':
        from storymanager.tests_utils import create_user, login_user_into_client

        another_user = create_user(username)
        login_user_into_client(another_user, self.client)
        self.room.add_user(another_user)
        return another_user

    @staticmethod
    def _populate_users(num_users=5):
        from storymanager.tests_utils import create_user
        for i in range(num_users):
            create_user(str(i))
