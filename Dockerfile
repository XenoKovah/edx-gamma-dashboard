FROM python:2.7-slim
LABEL maintainer="cmltaWt0@gmail.com"

ADD ./requirements/dev.txt /

RUN pip install -r /dev.txt

RUN apt-get update -y && apt-get install -y make nodejs npm

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN make install-react-deps
