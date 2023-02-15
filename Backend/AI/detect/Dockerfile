FROM python:3.7

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

# 해당 디렉토리에 있는 모든 하위항목들을 '/test'로 복사한다
COPY . /test

# image의 directory로 이동한다
WORKDIR /test

# 필요한 의존성 라이브러리 설치
RUN pip3 install -r requirements.txt

# port 명시
EXPOSE 5000

# 명령어 실행
CMD python3 ./ai_detect.py
