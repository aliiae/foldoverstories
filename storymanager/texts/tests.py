from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient

from accounts.tests import create_user, login_user_into_client
from rooms.models import get_user_room_membership, leave_room
from storymanager.tests_utils import create_user_room, create_user_room_text

User = get_user_model()


def post_text_from_client_to_room(text_data, client, room):
    return client.post(reverse('texts-list', kwargs={'room_title': room.room_title}),
                       data=text_data)


class HttpTextsTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = create_user()
        login_user_into_client(self.user, self.client)
        self.room_title = 'a-b'
        self.room = create_user_room(self.user, self.room_title)

    def test_user_can_add_text(self):
        text_data = {'visible_text': 'visible_text', 'hidden_text': 'hidden_text'}
        response = post_text_from_client_to_room(text_data, self.client, self.room)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_user_can_add_text_with_only_visible_part(self):
        text_data = {'visible_text': 'visible_text'}
        response = post_text_from_client_to_room(text_data, self.client, self.room)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_user_cannot_add_text_with_only_hidden_part(self):
        text_data = {'hidden_text': 'hidden_text'}
        response = post_text_from_client_to_room(text_data, self.client, self.room)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_user_cannot_add_empty_text(self):
        text_data = {}
        response = post_text_from_client_to_room(text_data, self.client, self.room)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_user_cannot_add_text_to_finished_room(self):
        text_data = {'visible_text': 'visible_text'}
        self.room.is_finished = True
        self.room.save()
        response = post_text_from_client_to_room(text_data, self.client, self.room)
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_user_can_list_room_texts(self):
        texts = [create_user_room_text(self.user, self.room, visible_text=str(i))
                 for i in range(10)]
        response = self.client.get(
            reverse('texts-list', kwargs={'room_title': self.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertListEqual([t.visible_text for t in texts],
                             [t['visible_text'] for t in response.data])

    def test_user_can_list_empty_room_with_no_texts(self):
        texts = []
        response = self.client.get(
            reverse('texts-list', kwargs={'room_title': self.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertListEqual(texts, response.data)

    def test_user_with_prev_texts_cannot_write_after_another_user_joined(self):
        text_data = {'visible_text': 'visible_text', 'hidden_text': 'hidden_text'}
        post_text_from_client_to_room(text_data, self.client, self.room)
        this_user = self.user
        this_membership = get_user_room_membership(this_user, self.room)
        self.assertTrue(this_membership.can_write_now)
        another_user = create_user('another_user')
        login_user_into_client(another_user, self.client)
        self.room.add_user(another_user)
        login_user_into_client(this_user, self.client)
        this_membership = get_user_room_membership(this_user, self.room)
        self.assertFalse(this_membership.can_write_now)
        response = post_text_from_client_to_room(text_data, self.client, self.room)
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_user_with_no_prev_texts_can_write_after_another_user_joined(self):
        text_data = {'visible_text': 'visible_text', 'hidden_text': 'hidden_text'}
        this_user = self.user
        self.assertTrue(get_user_room_membership(this_user, self.room).can_write_now)
        another_user = create_user('another_user')
        self.room.add_user(another_user)
        this_membership = get_user_room_membership(this_user, self.room)
        self.assertTrue(this_membership.can_write_now)
        response = post_text_from_client_to_room(text_data, self.client, self.room)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_current_turn_user_is_chronologically_after_previous_author(self):
        authors_count = 10
        other_usernames = [f'user-{i}' for i in range(1, authors_count)]
        # first_author_index = authors_count // 2
        first_author_index = 0
        users = []
        for i, another_username in enumerate(other_usernames):
            another_user = create_user(another_username)
            login_user_into_client(another_user, self.client)
            self.room.add_user(another_user)
            if i == first_author_index:
                response = post_text_from_client_to_room({'visible_text': 'x'}, self.client,
                                                         self.room)
                self.assertEqual(status.HTTP_201_CREATED, response.status_code)
            users.append(another_user)
        users = [self.user] + users
        exp_current_turn_index = (first_author_index + 1 + 1) % authors_count
        for i, user in enumerate(users):
            login_user_into_client(user, self.client)
            membership = get_user_room_membership(user, self.room)
            if i < exp_current_turn_index:  # users before are not allowed to write
                self.assertFalse(membership.can_write_now)
                response = post_text_from_client_to_room({'visible_text': 'x'}, self.client,
                                                         self.room)
                self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)
            else:  # users after are allowed to write in turn
                self.assertTrue(membership.can_write_now)
                response = post_text_from_client_to_room({'visible_text': 'x'}, self.client,
                                                         self.room)
                self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_user_in_a_single_user_room_can_write_many_times(self):
        membership = get_user_room_membership(self.user, self.room)
        for _ in range(10):
            self.assertTrue(membership.can_write_now)
            response = post_text_from_client_to_room({'visible_text': 'x'}, self.client,
                                                     self.room)
            self.assertTrue(membership.can_write_now)
            self.assertEqual(status.HTTP_201_CREATED, response.status_code)

    def test_user_cannot_write_after_room_is_finished(self):
        self.room.close()
        membership = get_user_room_membership(self.user, self.room)
        self.assertFalse(membership.can_write_now)

    def test_user_cannot_write_after_leaving_room(self):
        membership = get_user_room_membership(self.user, self.room)
        leave_room(self.room.room_title, membership)
        membership = get_user_room_membership(self.user, self.room)
        self.assertFalse(membership.can_write_now)

