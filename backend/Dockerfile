# pull official base image
FROM jfloff/alpine-python:latest-slim as base

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2
RUN apk update && \
    apk --no-cache --virtual add gcc musl-dev netcat-openbsd python3-dev && \
    apk add postgresql-dev libffi-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# to run tests
RUN pip install pytest

# copy entrypoint.sh
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

# copy project
COPY . /usr/src/app/

# run entrypoint.sh
RUN ["chmod", "+x", "/usr/src/app/entrypoint.sh"]
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
