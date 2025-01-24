#!/bin/bash

IMAGE_NAME=wrzchwc/deskly

docker build -f Dockerfile . -t deskly
docker tag deskly $IMAGE_NAME
docker login
docker push $IMAGE_NAME