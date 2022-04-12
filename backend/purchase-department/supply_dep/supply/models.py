from django.db import models


class Material(models.Model):
    name = models.CharField(max_length=10, null=False)
    amount = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    cost = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)  # price per unit
    general_expenses = models.DecimalField(max_digits=11, decimal_places=2, default=0.00)


class Feedstock(models.Model):
    name = models.CharField(max_length=10, null=False)
    amount = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    cost = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    general_expenses = models.DecimalField(max_digits=11, decimal_places=2, default=0.00)
