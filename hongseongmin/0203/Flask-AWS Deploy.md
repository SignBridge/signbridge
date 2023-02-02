참고:

https://yeowool0217.tistory.com/620

https://ndb796.tistory.com/244



# EC2 연결

1. `cmd 관리자` 실행
2. `cd` .pem파일이 있는 디렉토리
3. AWS EC2 인스턴스 `연결` > `SSH 클라이언트` 클릭 >   ssh -i "???" ubuntu@ec2-3-38-245-111.ap-northeast-2.compute.amazonaws.com 복사
4.  cmd에 `붙여넣기`

5. ubuntu환경으로 접속 완료



# `파이썬` 서버 항상 실행시키기

1.  파이썬 서버를 구동시킵니다.

```
python3 app.py
```

2. 프로세스를 중지시킵니다.

```
Ctrl + Z
```

3. 백그라운드에서 서버를 다시 구동시킵니다.

```
bg
```

4. 소유권을 포기합니다.

```
disown -h
```



# 서버 중지

5000번 포트에서 돌아가는 프로세스를 확인합니다.

```
netstat -nap|grep 5000
```
특정한 프로세스를 종료시킵니다.

```
kill -9 {pid}
```



