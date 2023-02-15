# Backend 실행 방법

```
모든 과정은 intelliJ 기준으로 설명되어있습니다.
```

- 작성자: 홍성민



## build 결과물 얻기

backend/java 경로에서`[Open Folder as IntelliJ IDEA Community Edition Project]` 클릭

![image-20230215142427307](./Readme.assets/image-20230215142427307.png)



IntelliJ에서 `[Ctrl + Alt + S]` 단축키 입력 > `Build, Execution, Deployment` > `Build Tools`> `Gradle` > Build and run using, Run tests using 설정을 `IntelliJ IDEA`로 변경

![image-20230215142603186](./Readme.assets/image-20230215142603186.png)



화면 우측 `Gradle` 버튼을 눌러 메뉴바를 펼침 > `clean` 클릭하여 실행 > 클릭하여 `build` 실행 

![image-20230215143435413](./Readme.assets/image-20230215143435413.png)



build/libs 경로에 jar파일이 생성됨

---



## 도커 파일 생성

backend/java 경로에 Dockerfile 파일 생성

![image-20230215145545285](./Readme.assets/image-20230215145545285.png)



## 도커 이미지 생성, 도커 허브에 PUSH

Docker Desktop이 켜져 있는지 확인

![image-20230215144127048](./Readme.assets/image-20230215144127048.png)



backend/java 경로에서 bash 터미널 켜고, 

```
docker login
```

```bash
docker build -t [docker hub 계정명]/[repository명]:[태그명] .
```

ex) docker build -t `songil/backend:v1` .

```
docker push [docker hub 계정명]/[repository명]:[태그명]
```



---

## EC2에 ssh로 접속

```
ssh -i "xxx.pem" ubuntu@xxx
```



## 도커 명령어 입력
도커 허브에 올려져있는 이미지 pull 받기
```
sudo docker pull [docker hub 계정명]/[repository명]:[태그명]
```

도커 이미지 목록 출력
```
sudo docker images
```

컨테이너 생성(--rm: 컨테이너가 중지되면 자동으로 삭제, -d: 백그라운드에서 실행, -p: 포트 설정, --name:컨테이너 이름설정 )
```
sudo docker run --rm -d -p [외부포트]:[내부포트] --name [컨테이너 이름 설정] [image id]
```

도커 컨테이너 목록 출력

```
sudo docker ps		# 실행중인 컨테이너 목록 출력
sudo docker ps -a 	# 중지된 컨테이너도 목록 출력
```

