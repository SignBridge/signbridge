FROM ubuntu:latest

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /test
COPY . .
RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update

# install python

# RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install -y python3-pip python3.7-dev
RUN cd /usr/local/bin && \
  ln -s /usr/bin/python3 python && \
  ln -s /usr/bin/pip3 pip && \
  pip3 install --upgrade pip

RUN apt-get install -y --no-install-recommends tzdata g++ curl
  # java install
RUN apt-get install -y openjdk-8-jdk
ENV JAVA_HOME="/usr/lib/jvm/java-1.8-openjdk"

# pip library install
RUN pip3 install --no-cache-dir tensorflow-cpu==2.11.0
RUN pip3 install -r req.txt



EXPOSE 5000

CMD python3 ./app1.py