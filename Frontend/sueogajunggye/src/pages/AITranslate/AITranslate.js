import React, { Fragment, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import * as faceapi from "face-api.js";
import styles from "./AITranslate.module.css";
import SpeechRecognitor from "./SpeechRecognitor";
import ReactPlayer from "react-player/lazy";

const PORT_NUMBER = 5000;
const FACE_API_MODEL_LOCATION = process.env.PUBLIC_URL + "/models";
const START_MESSAGE = " 번역을 시작합니다. ";
const RELOCATION_MESSAGE = " 사각형에 얼굴을 맞춰주세요. ";
const CORRECT_LOCATION_MESSAGE =
  " 현재 위치에서 번역을 시작 해 주시길 바랍니다. ";
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 480;
let BASE_URL = "";
const BASE_VIDEO_URL =
  "https://d204.s3.ap-northeast-1.amazonaws.com/수어애니메이션/";
const AITranslate = () => {
  let detectionInterval;

  const jb = useRef();
  const str = useRef();
  const flag = useRef(0);
  const video = useRef();
  const animationVideo = useRef();
  const socket = useRef();
  const canvas = useRef();
  const context = useRef();
  const prevStr = useRef();
  const _count = useRef(0);
  const interval = useRef();
  const faceBoxes = useRef([]);
  const countWord = useRef(0);
  const urls = useRef([]);

  const [count, setCount] = useState(0);
  const [notifyMessage, setNotifyMessage] = useState();
  const [vidoeSrc, setVideoSrc] = useState(`${BASE_VIDEO_URL}가다.mp4`);

  const setUiSize = () => {
    // const width = window.innerWidth * 0.95;
    // const height = window.innerHeight * 0.7;
    // if (window.innerWidth >= 1280) {
    //   video.current.width = width / 2;
    //   video.current.height = height;
    //   faceBoxes.current[0].width = video.current.width * 0.2;
    //   faceBoxes.current[0].height = video.current.height * 0.2;
    //   faceBoxes.current[1].width = video.current.width * 0.15;
    //   faceBoxes.current[1].height = video.current.height * 0.15;
    //   animationVideo.current.width = width / 2;
    //   animationVideo.current.height = height;
    // } else {
    //   video.current.width = width;
    //   video.current.height = height / 2;
    //   animationVideo.current.width = width;
    //   animationVideo.current.height = height / 2;
    // }

    //   const width = window.innerWidth * 0.95;
    //   const height = window.innerHeight * 0.7;
    // animationVideo.current.style = `height: ${video.current.height}`;

    const videoOffsetWidth = video.current.offsetWidth;
    const boxes = faceBoxes.current;
    boxes[0].style = `width: ${parseInt(videoOffsetWidth * 0.16 + 0.5)}px;
    height: ${parseInt(videoOffsetWidth * 0.16 + 0.5)}px;
    left: ${parseInt(
      videoOffsetWidth / 2.0 -
        (videoOffsetWidth * 0.08 > 65 ? 65 : videoOffsetWidth * 0.08) +
        0.5
    )}px;`;
    let outerBoxWidth = boxes[0].style.width;
    let outerBoxLeft = boxes[0].style.left;
    boxes[1].style = `width: ${
      parseInt(outerBoxWidth.substring(0, outerBoxWidth.length - 2)) - 10
    }px;
    height: ${
      parseInt(outerBoxWidth.substring(0, outerBoxWidth.length - 2)) - 10
    }px;
    left: ${
      parseInt(outerBoxLeft.substring(0, outerBoxLeft.length - 2)) + 5
    }px;`;
  };

  const browserResizeHandler = () => {
    setUiSize();
  };

  const displaySize = () => {
    return {
      width: video.current.offsetWidth ? video.current.offsetWidth : "0px",
      height: video.current.offsetHeight ? video.current.offsetHeight : "0px",
    };
  };

  //최초 페이지 로딩 시 초기화
  useEffect(() => {
    //로컬호스트 통신
    // BASE_URL =
    //   window.location.protocol + "//" + document.domain + ":" + PORT_NUMBER;
    BASE_URL = "https://i8d204.p.ssafy.io";
    //서버 통신
    // BASE_URL = `http://3.35.127.122:5000`;

    socket.current = io.connect(BASE_URL, {
      cors: { origin: "*" },
    });
    socket.current.on("connect", function () {
      console.log("Connected...!", socket.connected);
    });
    socket.current.on("response_back", function (data) {
      countWord.current++;
      console.log("data", data);
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
    socket.current.on("delete_back", (data) => {
      _count.current = 0;
      countWord.current--;
      str.current = prevStr.current;
      var infoEl = document.getElementById("result");
      infoEl.value = data + "\n" + str.current;
      translate();
    });

    socket.current.on("result", (data) => {
      countWord.current++;
      // clearTimeout(timer);
      str.current = "";
      setNotifyMessage(data)
      countWord.current = 0;
    });

    context.current = canvas.current.getContext("2d");

    setUiSize();

    startTranslate();
    window.addEventListener("resize", browserResizeHandler);
    return () => {
      window.removeEventListener("resize", browserResizeHandler);
      socket.current.disconnect();
      clearInterval(interval);
      clearInterval(detectionInterval);
    };
  }, []);

  //시작하기 버튼
  function startVideo(event) {
    if (event) event.preventDefault();
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.current.srcObject = stream;
        video.current.play();
        setNotifyMessage(RELOCATION_MESSAGE);
      })
      .catch(function (error) {});
  }

  let initedCanvas;
  //번역 시작하기
  function startTranslate(event) {
    if (event) event.preventDefault();
    if (flag.current === 0) {
      flag.current = 1;
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceLandmark68Net.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceRecognitionNet.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceExpressionNet.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.ssdMobilenetv1.loadFromUri(FACE_API_MODEL_LOCATION),
      ]).then(() => {
        startVideo(event);
      });

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

      const boxes = faceBoxes.current;
      let outerBoxWidth = parseInt(
        boxes[0].style.width.substring(0, boxes[0].style.width.length - 2)
      );
      let outerBoxLeft = parseInt(
        boxes[0].style.left.substring(0, boxes[0].style.left.length - 2)
      );

      // if (box.x > outerBoxLeft && box.x < outerBoxLeft + outerBoxWidth) {
      //   if (box.y > 30 && box.y < 30 + outerBoxWidth) {
      //     setNotifyMessage(CORRECT_LOCATION_MESSAGE);
      //     changeColor();
      //     return;
      //   }
      // }

      clearInterval(interval.current);
      translate();
    });
  }

  // function changeColor() {
  //   const videoOffsetWidth = video.current.offsetWidth;
  //   const boxes = faceBoxes.current;
  //   boxes[0].style = `width: ${parseInt(videoOffsetWidth * 0.16 + 0.5)}px;
  //   height: ${parseInt(videoOffsetWidth * 0.16 + 0.5)}px;
  //   left: ${parseInt(
  //     videoOffsetWidth / 2.0 -
  //       (videoOffsetWidth * 0.08 > 65 ? 65 : videoOffsetWidth * 0.08) +
  //       0.5
  //   )}px; border-color : red;`;
  //   let outerBoxWidth = boxes[0].style.width;
  //   let outerBoxLeft = boxes[0].style.left;
  //   boxes[1].style = `width: ${
  //     parseInt(outerBoxWidth.substring(0, outerBoxWidth.length - 2)) - 10
  //   }px;border-color : red;
  //   height: ${
  //     parseInt(outerBoxWidth.substring(0, outerBoxWidth.length - 2)) - 10
  //   }px;
  //   left: ${
  //     parseInt(outerBoxLeft.substring(0, outerBoxLeft.length - 2)) + 5
  //   }px;`;
  //   clearInterval(interval.current);
  //   translate();
  // }

  function translate() {
    _count.current = 0;
    setCount(_count.current);
    manageDetection();
  }

  const manageDetection = () => {
    if (!detectionInterval) {
      console.log("detectionInterval");
      detectionInterval = setInterval(manageDetection, 300);
    }
    // if (countWord.current === 5) {
    //   clearInterval(detectionInterval);
    //   return;
    // } else {
    sendWebCamImage();
    // }
  };

  function sendWebCamImage() {
    const width = video.current.width;
    const height = video.current.height;
    const image = video.current;
    context.current.drawImage(image, 0, 0, width, height);
    // var data = canvas.current.toDataURL("image/jpeg", 0.5);
    const data = resizeImage(image);
    context.current.clearRect(0, 0, width, height);
    // if (_count.current > 30) {
    // _count.current = 0;
    socket.current.emit("image", data); //image 이벤트가 발생하면 data를 서버에 송신 data를 받기 위해 서버에서는 image 이벤트리스트를 만들놔야함
    // }
    _count.current++;
    setCount(_count.current);
  }

  function removeWord(event) {
    event.preventDefault();
    socket.current.emit("image", "delete");
    clearInterval(detectionInterval);
  }

  const resizeImage = (image) => {
    const resizeCanvas = document.createElement("canvas");
    resizeCanvas.width = VIDEO_WIDTH;
    resizeCanvas.height = VIDEO_HEIGHT;
    resizeCanvas
      .getContext("2d")
      .drawImage(image, 0, 0, resizeCanvas.width, resizeCanvas.height);
    //canvas의 dataurl를 blob(file)화 하는 과정
    var dataURI = resizeCanvas.toDataURL("image/jpeg", 0.5); //png => jpg 등으로 변환 가능
    return dataURI;
  };

  const onSpeechRecognitotionHandler = (words) => {
    urls.current.push(...words);
    console.log(urls.current);
    if (urls.current.length > 0) {
      setVideoSrc(`${BASE_VIDEO_URL + urls.current.shift()}.mp4`);
      // setVideoSrc(`${BASE_VIDEO_URL}너.mp4`);
      animationVideo.current.playing = true;
    }
  };

  const onVideoEndedHandler = (event) => {
    if (event) event.preventDefault();
    console.log(`videoEnded, next Play ${urls.current}`);
    if (urls.current.length > 0) {
      setVideoSrc(`${BASE_VIDEO_URL + urls.current.shift()}.mp4`);
      animationVideo.current.playing = true;
    }
  };

  return (
    <React.Fragment>
      <meta charSet="UTF-8" />
      <title>Document</title>
      <div className={styles.ex_layout}>
        <div className="gnb">
          수어 번역기
          <div className="item last">
            {/* <input
              type="button"
              onClick={startVideo}
              className="startButton"
              value="시작하기"
            /> */}
            <input
              type="button"
              onClick={removeWord}
              className="deleteButton"
              value="단어삭제"
            />
            {/* <input
              type="button"
              onClick={startTranslate}
              className="translateButton"
              value="변역하기"
            /> */}
            <SpeechRecognitor
              onSpeech={onSpeechRecognitotionHandler}
              BASE_URL={BASE_URL}
            />
          </div>
        </div>
        <div className="main">
          <div id={styles.container}>
            <video
              className={styles.video}
              playsInline=""
              width={VIDEO_WIDTH}
              id="videoElement"
              ref={video}
            />
            <ReactPlayer
              className={styles.video}
              playing={true} // 자동 재생 on
              muted={true} // 자동 재생 on
              controls={false} // 플레이어 컨트롤 노출 여부
              onEnded={() => onVideoEndedHandler()}
              url={vidoeSrc}
              ref={animationVideo}
            />
            <canvas id="canvas" width="0" ref={canvas} />
            <div id="jb-text" ref={jb} />
            {/* <div id={styles.count_box}>
              <p
                id="frame-count"
                style={{ marginLeft: 80, fontSize: 23, color: "red" }}
              >
                {count}
              </p>
            </div> */}
            <div
              className={styles.outline}
              id="boxes"
              ref={(el) => (faceBoxes.current[0] = el)}
            />
            <div
              className={styles.inner}
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
};

export default AITranslate;
