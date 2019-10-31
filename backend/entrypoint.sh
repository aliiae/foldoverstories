#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z "$SQL_HOST" "$SQL_PORT"; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python3 ./storymanager/manage.py makemigrations
python3 ./storymanager/manage.py migrate
python3 ./storymanager/manage.py makemigrations rooms
python3 ./storymanager/manage.py migrate rooms
python3 ./storymanager/manage.py makemigrations texts
python3 ./storymanager/manage.py migrate texts

exec "$@"
