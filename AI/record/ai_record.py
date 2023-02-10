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
sentence_list = ['마실 거는 뭘로 드시겠어요', '주문하시겠어요', '맛있게 드세요', '어때 먹을 만해']
word_list = ['가다','가능','가져가다', '감사합니다', '괜찮다', '기차역', '나', '너', '당신', '뜨겁다', '맞다', '매진', '먹다', '무엇' , '밥', '선박', '배', '배고프다', '비빔밥', '수어', '싶다', '아니다', '아빠', '아프다', '안녕하세요' , '엄마', '여기', '우리',  '집', '차갑다', '포장', '학교']
@app.route('/ai/recording/analyze', methods=['GET','OPTIONS'])
def analyze():
    speech_raw = request.args.get('speech')
    speech = ""
    speech_pos = []

    # 문장 일치 확인
    if speech_raw in sentence_list:
        speech += speech_raw + ' '

    # 형태소분석 + 단어 일치 확인
    if speech_raw: speech_pos = okt.pos(speech_raw)   
    print(speech_pos) 
    for word, pos in speech_pos:
        if pos != 'Josa' and word in word_list:
            speech += word + ' '
    
    response = Response()
    response.data = speech
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)