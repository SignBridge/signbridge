FROM ubuntu:latest

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /test
COPY . .
RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update

# RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install -y python3-pip python3.8-dev
RUN cd /usr/local/bin && \
  ln -s /usr/bin/python3 python && \
  ln -s /usr/bin/pip3 pip && \
  pip3 install --upgrade pip



# pip library install
RUN pip3 install -r requirements.txt



EXPOSE 5000

CMD python3 ./ai_detect.py
