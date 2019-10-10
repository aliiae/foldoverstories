from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIClient

from accounts.tests import create_user, login_user_into_client
from rooms.models import Room, Membership, add_user_to_room

User = get_user_model()


def create_user_room(user: User, room_title: str, **kwargs) -> Room:
    room = Room.objects.create(room_title=room_title, **kwargs)
    add_user_to_room(user, room)
    return room


class HttpTripTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = create_user()
        login_user_into_client(self.user, self.client)
        self.room_title = 'a-b'

    def test_user_can_list_rooms(self):
        rooms = [create_user_room(self.user, self.room_title + str(i)) for i in range(10)]
        response = self.client.get(reverse('rooms-list'))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        exp_room_titles = [room.room_title for room in rooms]
        act_room_titles = [room.get('room_title') for room in response.data['results']]
        self.assertCountEqual(exp_room_titles, act_room_titles)

    def test_user_can_retrieve_room_by_title(self):
        room = create_user_room(self.user, self.room_title)
        response = self.client.get(reverse('rooms-detail', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(room.room_title, response.data.get('room_title'))

    def test_user_can_read_room_texts_by_title(self):
        room = create_user_room(self.user, self.room_title, is_finished=True)
        response = self.client.get(
            reverse('room_read-list', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual([], response.data)  # todo: populate with texts

    def test_user_can_join_room(self):
        room = create_user_room(self.user, self.room_title)
        usernames = list(map(str, range(10)))
        responses = []
        for username in usernames:
            another_user = create_user(username)
            login_user_into_client(another_user, self.client)
            response = self.client.post(
                reverse('room_users', kwargs={'room_title': room.room_title}))
            responses.append(response)
        self.assertTrue(all(r.status_code == status.HTTP_200_OK for r in responses))
        usernames = [self.user.username] + usernames
        response_users_list = self.client.get(
            reverse('room_users', kwargs={'room_title': room.room_title}))
        self.assertEqual(usernames, [u['username'] for u in response_users_list.data])

    def test_user_can_leave_room(self):
        room = create_user_room(self.user, self.room_title)
        response = self.client.post(
            reverse('leave_room', kwargs={'room_title': room.room_title}))
        user_membership = Membership.objects.get(room=room, user=self.user)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertTrue(user_membership.has_stopped)

    def test_user_can_list_room_users(self):
        room = create_user_room(self.user, self.room_title)
        usernames = list(map(str, range(10)))
        for username in usernames:
            another_user = create_user(username)
            login_user_into_client(another_user, self.client)
            add_user_to_room(another_user, room)
        usernames = [self.user.username] + usernames
        response = self.client.get(
            reverse('room_users', kwargs={'room_title': room.room_title}))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(usernames, [u['username'] for u in response.data])
