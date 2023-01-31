import React, { Fragment, useEffect, useRef} from "react";
import { io } from "socket.io-client";

const PORT_NUMBER = 5000;

function AITranslate() {

  const socket = useRef();
  const canvas = useRef();
  
  //최초 페이지 로딩 시 초기화
  useEffect(() => {
    socket.current = io.connect(
      window.location.protocol + "//" + document.domain + ":" + PORT_NUMBER
    );
    socket.current.on("connect", function () {
      console.log("Connected...!", socket.connected);
    });
  }, []);
  
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
            <input type="button" className="startButton" value='시작하기' />
            <input type="button" className="deleteButton" value='단어삭제' />
            <input type="button" className="translateButton" value='변역하기' />
          </div>
        </div>
        <div className="main">
          <div id="container">
            <video autoPlay="" playsInline="" id="videoElement" />
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
          <textarea id="result" defaultValue={""} />
        </div>
      </div>
    </React.Fragment>
  );

}

export default AITranslate;
