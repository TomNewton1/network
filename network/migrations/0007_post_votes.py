# Generated by Django 3.2.5 on 2021-08-28 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0006_auto_20210827_1705'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='votes',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
