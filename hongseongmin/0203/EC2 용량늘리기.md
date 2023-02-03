참고: https://inistory.tistory.com/186

### EC2 프리티어는 30GB까지 이용가능



---

1. EC2 > Instances > Instance 선택
2. Storage > Volume ID 클릭 > 우클릭 > Modify Volume
3. Size 수정
4. 마운트

```bash
lsblk
# part / 표시가 있는 곳이 루트이다
```

```
sudo growpart /dev/xvda1 1
안되면
sudo growpart /dev/xvda 1
```

```bash
lsblk
```

```bash
sudo resize2fs /dev/xvda1
```

