from django.db import models

# Example model (empty for now)

class Example(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
