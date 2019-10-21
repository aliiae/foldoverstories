FROM python:3.7
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y --no-install-recommends postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

COPY requirements.txt /app/backend
RUN pip3 install --upgrade pip -r requirements.txt

COPY . /app/backend

EXPOSE 8000
EXPOSE 443

#RUN python3 ./storymanager/manage.py makemigrations
#RUN python3 ./storymanager/manage.py migrate auth
#RUN python3 ./storymanager/manage.py migrate rooms
#RUN python3 ./storymanager/manage.py migrate texts

CMD python3 ./storymanager/manage.py runserver 0.0.0.0:8000
