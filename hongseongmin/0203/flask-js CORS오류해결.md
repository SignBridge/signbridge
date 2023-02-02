참고: https://coding-groot.tistory.com/91



# js코드

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <button id="start">음성인식 시작</button>
    <button id="stop">음성인식 멈추기</button>
</body>
</html>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>

    if(!("webkitSpeechRecognition" in window)) {
        alert('Chrome만 지원됩니다.');
    } else {
        const speech = new webkitSpeechRecognition;

        document.getElementById("start").addEventListener("click", () => {
            speech.start();
        })

        document.getElementById("stop").addEventListener("click", () => {
            speech.stop();
        })

        speech.addEventListener("result", (envet) => {
            const {transcript} = event["results"][0][0];
            console.log(transcript);

            axios.get('http://3.38.245.111:5000/recording/analyze', {
              "speech": transcript,
            })
              .then(response => {
                console.log(response.config.speech);
              })
              .catch(error => {
                console.log(error);
              });
        })
    }


</script>
```



# flask (파이썬) 코드

```
from flask import Flask, request
import flask

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/recording/analyze', methods=['GET'])
def analyze():
    speech = request.args.get('speech')
    res = flask.Response(speech)
    res.headers["Access-Control-Allow-Origin"] = "*"
    return res

if __name__ == '__main__':
    app.run()
```



기존에 시도했던 CORS 대신 flask.Response를 활용함.

Response객체의 headers를 ["Access-Control-Allow-Origin"] = "*"로 설정

speech도 Response객체에 포함시킴. 프론트에서 확인할 때 위치는 

```
axios.get('http://3.38.245.111:5000/recording/analyze', {
              "speech": transcript,
            })
              .then(response => {
                console.log(response.config.speech);   <<< 여기
              })
              .catch(error => {
                console.log(error);
              });
```

