import django
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APITestCase


class AuthenticationTest(APITestCase):
    def setUp(self):
        django.setup()
        self.client = APIClient()

    def test_user_can_register(self):
        from storymanager.tests_utils import PASSWORD
        response = self.client.post(reverse('register'), data={
            'username': 'test_user',
            'password': PASSWORD,
        })
        user = get_user_model().objects.last()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(response.data['user']['username'], user.username)

    def test_user_can_log_in(self):
        from storymanager.tests_utils import PASSWORD, create_user
        user = create_user()
        response = self.client.post(reverse('knox_login'), data={
            'username': user.username,
            'password': PASSWORD,
        })
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(response.data['user']['username'], user.username)

    def test_user_can_log_out(self):
        from storymanager.tests_utils import create_user, login_user_into_client
        user = create_user()
        login_user_into_client(user, self.client)
        response = self.client.post(reverse('knox_logout'))
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
