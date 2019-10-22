from django.contrib.auth import get_user_model
from django.utils.dateparse import parse_datetime
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient
from rooms.models import Membership, get_user_room_membership
from storymanager.tests_utils import (create_user, login_user_into_client, create_user_room,
                                      create_user_room_text)
from texts.tests import post_text_from_client_to_room

User = get_user_model()


class HttpRoomsTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = create_user()
        login_user_into_client(self.user, self.client)
        self.room_title = 'a-b'

    def test_user_can_create_room(self):
        response = self.client.post(reverse('rooms-list'))
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertTrue('modified_at' not in response.data)
        list_response = self.client.get(reverse('rooms-list'))
        self.assertEqual(status.HTTP_200_OK, list_response.status_code)
        self.assertEqual(len(list_response.data['results']), 1)

    def test_user_can_list_rooms(self):
        rooms = [create_user_room(self.user, self.room_title + str(i)) for i in range(10)]
        response = self.client.get(reverse('rooms-list'))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        exp_room_titles = list(reversed([room.room_title for room in rooms]))
        act_room_titles = [room.get('room_title') for room in response.data['results']]
        self.assertListEqual(exp_room_titles, act_room_titles)

    def test_rooms_are_listed_in_reversed_chronological_order(self):
        _ = [create_user_room(self.user, self.room_title + str(i)) for i in range(10)]
        response = self.client.get(reverse('rooms-list'))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        for first, second in zip(response.data['results'], response.data['results'][1:]):
            self.assertTrue(parse_datetime(first['modified_at'])
                            >= parse_datetime(second['modified_at']))

    def test_user_can_retrieve_own_room_by_title(self):
        room = create_user_room(self.user, self.room_title)
        response = self.client.get(reverse('rooms-detail', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(room.room_title, response.data.get('room_title'))

    def test_current_turn_username_is_equal_to_authors_username_in_new_room(self):
        room = create_user_room(self.user, self.room_title)
        response = self.client.get(reverse('rooms-detail', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.user.username, response.data.get('current_turn_username'))

    def test_user_can_retrieve_another_users_room_before_joining(self):
        another_user = create_user('another-user')
        room = create_user_room(another_user, self.room_title)
        response = self.client.get(reverse('rooms-detail', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(room.room_title, response.data.get('room_title'))

    def test_user_can_get_empty_visible_text_from_empty_room_detail(self):
        room = create_user_room(self.user, self.room_title)
        response = self.client.get(reverse('rooms-detail', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual('', response.data['visible_text'])

    def test_user_can_get_visible_text_from_room_detail(self):
        room = create_user_room(self.user, self.room_title)
        create_user_room_text(self.user, room, visible_text='test_text')
        response = self.client.get(reverse('rooms-detail', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual('test_text', response.data['visible_text'])

    def test_user_can_read_room_texts_by_title(self):
        room = create_user_room(self.user, self.room_title, is_finished=True)
        texts = [create_user_room_text(self.user, room, visible_text=str(i))
                 for i in range(10)]
        response = self.client.get(
            reverse('room_read-list', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual([t.hidden_text + ' ' + t.visible_text for t in texts],
                         [t['full_text'] for t in response.data])

    def test_user_can_read_empty_room_with_no_texts_by_title(self):
        room = create_user_room(self.user, self.room_title, is_finished=True)
        response = self.client.get(
            reverse('room_read-list', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertListEqual([], response.data)

    def test_user_can_join_room(self):
        room = create_user_room(self.user, self.room_title)
        usernames = list(map(str, range(10)))
        responses = []
        for username in usernames:
            another_user = create_user(username)
            login_user_into_client(another_user, self.client)
            response = self.client.post(
                reverse('room_users', kwargs={'room_title': room.room_title}))
            self.assertIsNone(response.data)
            responses.append(response)
        self.assertTrue(all(r.status_code == status.HTTP_200_OK for r in responses))
        usernames = [self.user.username] + usernames
        response_users_list = self.client.get(
            reverse('room_users', kwargs={'room_title': room.room_title}))
        self.assertEqual(usernames, [u['username'] for u in response_users_list.data])

    def test_user_can_leave_room(self):
        room = create_user_room(self.user, self.room_title)
        response = self.client.post(
            reverse('rooms-leave', kwargs={'room_title': room.room_title}))
        user_membership = Membership.objects.get(room=room, user=self.user)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertTrue(user_membership.status == Membership.STOPPED)

    def test_room_closes_after_everyone_leaves(self):
        room = create_user_room(self.user, self.room_title)
        self.client.post(reverse('rooms-leave', kwargs={'room_title': room.room_title}))
        room.refresh_from_db()
        self.assertTrue(room.is_finished)
        self.assertIsNotNone(room.finished_at)

    def test_user_can_list_room_users_thorough_users_list(self):
        room = create_user_room(self.user, self.room_title)
        usernames = self.create_many_users_in_room(room)
        response = self.client.get(
            reverse('room_users', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertListEqual(usernames, [u['username'] for u in response.data])

    def test_user_can_list_room_users_through_rooms_detail(self):
        room = create_user_room(self.user, self.room_title)
        usernames = self.create_many_users_in_room(room)
        response = self.client.get(
            reverse('rooms-detail', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertListEqual(usernames, [u['username'] for u in response.data['users']])
        self.assertTrue('texts_count' in response.data['users'][0])

    def test_user_list_updates_current_turn_user(self):
        room = create_user_room(self.user, self.room_title)
        usernames = list(map(str, range(3)))
        users = []
        first_author_index = 0
        for i, username in enumerate(usernames):
            another_user = create_user(username)
            login_user_into_client(another_user, self.client)
            room.add_user(another_user)
            if i == first_author_index:
                post_text_from_client_to_room({'visible_text': 'x'}, self.client, room)
            users.append(another_user)
        expected_curr_user = users[(first_author_index + 1) % len(users)]
        self.client.get(reverse('room_users', kwargs={'room_title': room.room_title}))
        expected_curr_membership = get_user_room_membership(expected_curr_user, room)
        self.assertTrue(expected_curr_membership.status == Membership.CAN_WRITE)

    def create_many_users_in_room(self, room):
        usernames = list(map(str, range(10)))
        for username in usernames:
            another_user = create_user(username)
            login_user_into_client(another_user, self.client)
            room.add_user(another_user)
        usernames = [self.user.username] + usernames
        return usernames
