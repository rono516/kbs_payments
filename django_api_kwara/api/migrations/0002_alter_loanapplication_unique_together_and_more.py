# Generated by Django 5.0.6 on 2024-08-13 06:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='loanapplication',
            unique_together={('account_holder_id', 'product_id')},
        ),
        migrations.AlterUniqueTogether(
            name='savingsapplication',
            unique_together={('account_holder_id', 'product_id')},
        ),
    ]
