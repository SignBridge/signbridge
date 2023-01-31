import React, { Fragment, useState, useEffect, useRef} from "react";
import { io } from "socket.io-client";

const PORT_NUMBER = 5000;
const START_MESSAGE = " 번역을 시작합니다. ";

function AITranslate() {

  const video = useRef();
  const socket = useRef();
  const canvas = useRef();
  const context = useRef();

  const [notifyMessage, setNotifyMessage] = useState();

  //최초 페이지 로딩 시 초기화
  useEffect(() => {
    socket.current = io.connect(
      window.location.protocol + "//" + document.domain + ":" + PORT_NUMBER
    );
    socket.current.on("connect", function () {
      console.log("Connected...!", socket.connected);
    });
    context.current = canvas.current.getContext("2d");
  }, []);
  
  //시작하기 버튼
  function start(event) {
    event.preventDefault();
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.current.srcObject = stream;
          video.current.play();
          setNotifyMessage(START_MESSAGE);
        })
        .catch(function (err0r) {});
    }
  }

  return (
    <React.Fragment>
      <meta charSet="UTF-8" />
      <title>Document</title>
      <link
        href="{{url_for('static', filename = 'style.css')}}"
        rel="stylesheet"
      />
      <div className="ex-layout">
        <div className="gnb">
          수어 번역기
          <div className="item last">
            <input type="button" onClick={start} className="startButton" value='시작하기' />
            <input type="button" className="deleteButton" value='단어삭제' />
            <input type="button" className="translateButton" value='변역하기' />
          </div>
        </div>
        <div className="main">
          <div id="container">
            <video autoPlay="" playsInline="" id="videoElement" ref={video} />
            <canvas id="canvas" width={640} height={480} ref={canvas} />
            <div id="jb-text" />
            <div id="count_box">
              <p
                id="frame-count"
                style={{ marginLeft: 80, fontSize: 23, color: "red" }}
              />
            </div>
            <div className="outline" id="boxes" />
            <div className="inner" id="boxes" />
          </div>
        </div>
        <div className="footer">
          <textarea id="result" defaultValue={notifyMessage} />
        </div>
      </div>
    </React.Fragment>
  );

}

export default AITranslate;
