from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from konlpy.tag import Okt

app = Flask(__name__)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
        }
    })

# Okt Class의 생성자를 이용하여 분석기를 생성 
okt = Okt()
word_list = ['가다','가능','가져가다', '감사합니다', '괜찮다', '기차역', '나', '너', '당신', '뜨겁다', '마실거는뭘로드시겠어요', '맛있게드세요', '맞다(참)', '매진', '먹다', '무엇' ,'밥', '배(선박)', '배(신체)', '배고프다', '비빔밥', '수어', '싶다', '아니다', '아빠', '아프다', '안녕하세요', '어때먹을만해', '엄마', '여기', '우리', '주문하시겠어요', '집', '차갑다', '포장', '학교']
@app.route('/ai/recording/analyze', methods=['GET','OPTIONS'])
def analyze():
    speech_raw = request.args.get('speech')
    speech_pos = []
    if speech_raw: speech_pos = okt.pos(speech_raw)
    speech = ""
    for word, pos in speech_pos:
        if pos != 'Josa' and word in word_list:
            speech += word + ' '
    
    response = Response()
    response.data = speech
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)