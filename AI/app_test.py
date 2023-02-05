from flask import Flask, render_template, request
import flask
# from konlpy.tag import Okt

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
    # return render_template('index.html')
    return "Hello"


# Okt Class의 생성자를 이용하여 분석기를 생성 
# okt = Okt()
# @app.route('/recording/analyze', methods=['GET'])
# def analyze():
    
#     speech = request.args.get('speech')
#     speech = okt.nouns(speech)
#     print(speech, type(speech))
#     res = flask.Response(speech)
#     res.headers["Access-Control-Allow-Origin"] = "*"
#     return res

if __name__ == '__main__':
    app.run(host='0.0.0.0')