from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APITestCase

from storymanager.tests_utils import create_user, login_user_into_client, PASSWORD

User = get_user_model()


class AuthenticationTest(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_user_can_register(self):
        response = self.client.post(reverse('register'), data={
            'username': 'test_user',
            'password': PASSWORD,
        })
        user = get_user_model().objects.last()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(response.data['user']['username'], user.username)

    def test_user_can_log_in(self):
        user = create_user()
        response = self.client.post(reverse('knox_login'), data={
            'username': user.username,
            'password': PASSWORD,
        })
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(response.data['user']['username'], user.username)

    def test_user_can_log_out(self):
        user = create_user()
        login_user_into_client(user, self.client)
        response = self.client.post(reverse('knox_logout'))
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
