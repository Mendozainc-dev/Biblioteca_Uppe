from django.test import TestCase


class BasicTest(TestCase):
    def test_ping(self):
        resp = self.client.get('/ping/')
        self.assertEqual(resp.status_code, 200)
