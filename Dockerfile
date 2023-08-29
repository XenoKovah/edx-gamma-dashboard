FROM python:3.10-slim-bullseye
LABEL maintainer="cmltaWt0@gmail.com"

ADD ./requirements/dev.txt /

RUN pip install -r /dev.txt

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y make nodejs build-essential

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN make install-react-deps-ci
