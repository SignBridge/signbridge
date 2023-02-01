import React, { Fragment, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import * as faceapi from "face-api.js";
import "./AITranslate.css";

const PORT_NUMBER = 5000;
const FACE_API_MODEL_LOCATION = process.env.PUBLIC_URL + "/models";
const START_MESSAGE = " 번역을 시작합니다. ";
const RELOCATION_MESSAGE = " 사각형에 얼굴을 맞춰주세요. ";
const CORRECT_LOCATION_MESSAGE =
  " 현재 위치에서 번역을 시작 해 주시길 바랍니다. ";

function AITranslate() {
  let timer;

  const jb = useRef();
  const str = useRef();
  const flag = useRef(0);
  const video = useRef();
  const socket = useRef();
  const canvas = useRef();
  const context = useRef();
  const prevStr = useRef();
  const _count = useRef(0);
  const interval = useRef();
  const faceBoxes = useRef([]);
  const countWord = useRef(0);

  const [count, setCount] = useState(0);
  const [notifyMessage, setNotifyMessage] = useState();

  const displaySize = () => {
    return { width: video.current.width, height: video.current.height };
  };

  //최초 페이지 로딩 시 초기화
  useEffect(() => {
    socket.current = io.connect(
      window.location.protocol + "//" + document.domain + ":" + PORT_NUMBER,
      {
        cors: { origin: "*" },
      });
    socket.current.on("connect", function () {
      console.log("Connected...!", socket.connected);
    });
    socket.current.on("response_back", function (data) {
      countWord.current++;
      if (data === "failed") {
        setNotifyMessage(
          str.current + "\n단어 인식에 실패하였습니다. 다시 동작해주세요."
        );
        countWord.current--;
        translate();
      } else {
        jb.current.value =
          "<p style = 'margin-top : -100px; text-align:center;font-size:30px;color:#ffffff'> 다음 단어를 입력해주세요.</p>";
        prevStr.current = str.current;
        str.current += " " + data;
        setNotifyMessage(str.current);
        translate();
      }
    });
    context.current = canvas.current.getContext("2d");
    video.current.width = 640;
    video.current.height = 480;
  }, []);

  //시작하기 버튼
  function startVideo(event) {
    event.preventDefault();
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.current.srcObject = stream;
          video.current.play();
          setNotifyMessage(RELOCATION_MESSAGE);
        })
        .catch(function (err0r) {});
    }
  }

  let initedCanvas;
  //번역 시작하기
  function startTranslate(event) {
    event.preventDefault();
    if (flag.current === 0) {
      flag.current = 1;
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceLandmark68Net.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceRecognitionNet.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceExpressionNet.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.ssdMobilenetv1.loadFromUri(FACE_API_MODEL_LOCATION),
      ]).then(startVideo(event));

      video.current.addEventListener("play", () => {
        // canvas를 초기화 함
        initedCanvas = faceapi.createCanvas(video.current);
        faceapi.matchDimensions(initedCanvas, displaySize());
        // 100ms 마다 화면에 video frame이 표시 됨
        interval.current = setInterval(startDetect, 1000 / 30);
      });
    } else {
      setNotifyMessage(START_MESSAGE);
      translate();
    }
  }

  // video에서 얼굴을 식별
  async function startDetect() {
    const detections = await faceapi
      .detectAllFaces(video.current)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize());
    initedCanvas
      .getContext("2d")
      .clearRect(0, 0, initedCanvas.width, initedCanvas.height);
    // video에서 얼굴 좌표에 box를 그림
    resizedDetections.forEach((detection) => {
      const box = detection.detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, { label: "Face" });
      drawBox.draw(initedCanvas);
      // box의 좌표 값과 너비, 길이를 콘솔창에 출력
      // console.log(box.x, box.y, box.width, box.height)
      // console.log(box.x, box.y);
      if (box.x > 220 && box.x < 290) {
        if (box.y > 65 && box.y < 90) {
          setNotifyMessage(CORRECT_LOCATION_MESSAGE);
          changeColor();
          return;
        }
      }
    });
  }

  function changeColor() {
    faceBoxes.current.forEach((element) => {
      element.style = "border-color : red";
    });
    clearInterval(interval);
    translate();
  }

  function translate() {
    _count.current = 0;
    setCount(_count.current);
    manageDetection();
  }

  const manageDetection = () => {
    if (!timer && countWord.current === 5) {
      clearTimeout(timer);
      return;
    } else {
      send30();
      timer = setTimeout(manageDetection, 300);
    }
  };

  function send30() {
    if (_count.current >= 30) {
      clearTimeout(timer);
    } else {
      const width = video.current.width;
      const height = video.current.height;
      context.current.drawImage(video.current, 0, 0, width, height);
      var data = canvas.current.toDataURL("image/jpeg", 0.5);
      context.current.clearRect(0, 0, width, height);
      socket.current.emit("image", data); //image 이벤트가 발생하면 data를 서버에 송신 data를 받기 위해 서버에서는 image 이벤트리스트를 만들놔야함
      _count.current++;
      setCount(_count.current);
    }
  }

  function removeWord(event) {
    event.preventDefault();
    socket.current.emit("image", "delete");
    clearTimeout(timer);
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
            <input
              type="button"
              onClick={startVideo}
              className="startButton"
              value="시작하기"
            />
            <input
              type="button"
              onClick={removeWord}
              className="deleteButton"
              value="단어삭제"
            />
            <input
              type="button"
              onClick={startTranslate}
              className="translateButton"
              value="변역하기"
            />
          </div>
        </div>
        <div className="main">
          <div id="container">
            <video autoPlay="" playsInline="" id="videoElement" ref={video} />
            <canvas id="canvas" width={640} height={480} ref={canvas} />
            <div id="jb-text" ref={jb} />
            <div id="count_box">
              <p
                id="frame-count"
                style={{ marginLeft: 80, fontSize: 23, color: "red" }}
              >
                {count}
              </p>
            </div>
            <div
              className="outline"
              id="boxes"
              ref={(el) => (faceBoxes.current[0] = el)}
            />
            <div
              className="inner"
              id="boxes"
              ref={(el) => (faceBoxes.current[1] = el)}
            />
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
