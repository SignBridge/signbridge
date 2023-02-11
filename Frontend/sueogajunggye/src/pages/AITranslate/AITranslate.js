import React, {
  Fragment,
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";
import * as faceapi from "face-api.js";
import styles from "./AITranslate.module.css";
import SpeechRecognitor from "./SpeechRecognitor";
import ReactPlayer from "react-player/lazy";
import { MoonLoader } from "react-spinners";
import {speak} from "../../components/converter/TextToSpeechConverter";

const PORT_NUMBER = 5002;
const FACE_API_MODEL_LOCATION = process.env.PUBLIC_URL + "/models";
const START_MESSAGE = "\n번역을 시작합니다.\n\n얼굴, 어깨, 팔꿈치, 손이 보이도록\n기기를 배치해주세요.";
const FAIL_MESSAGE = "\n단어 인식에 실패하였습니다.\n\n얼굴, 어깨, 팔꿈치, 손이 보이도록\n기기를 배치해주세요.";
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 480;
let BASE_URL = "";
const BASE_VIDEO_URL =
  "https://d204.s3.ap-northeast-1.amazonaws.com/수어애니메이션/";

const VideoStatus = {
  IS_LOADING: 'is_loading',
  CAMERA_WORKING: 'camera_working',
  AI_TRANSLATE_WORKING: 'Ai_translate_working',
  VIDEO_PLAYING: 'video_playing'
}

const AITranslate = () => {
  let localStream;
  const str = useRef();
  const flag = useRef(0);
  // const video = useRef();
  // const animationVideo = useRef();
  const socket = useRef();
  const canvas = useRef();
  const context = useRef();
  const prevStr = useRef();
  const _count = useRef(0);
  const interval = useRef();
  // const faceBoxes = useRef([]);
  const countWord = useRef(0);
  const urls = useRef([]);
  const detectionInterval = useRef();
  // const [isAiLoading, setIsAiLoading] = useState();
  // const [isSpeeching, setIsSpeeching] = useState();
  const [videoStatus, setVideoStatus] = useState(VideoStatus.IS_LOADING);
  const [notifyMessage, setNotifyMessage] = useState();
  const [vidoeSrc, setVideoSrc] = useState();

  const cleanInterval = () => {
    // console.log(interval.current);
    if (interval.current !== undefined) {
      console.log("clear");
      clearInterval(interval.current);
      interval.current = undefined;
    }
    if (detectionInterval.current !== undefined) {
      clearInterval(detectionInterval.current);
      detectionInterval.current = undefined;
    }
    flag.current = 0;
  };

  const displaySize = () => {
    const video = document.getElementsByClassName(styles.video);
    return {
      width: video[0].offsetWidth ? video[0].offsetWidth : 100,
      height: video[0].offsetHeight ? video[0].offsetHeight : 100,
    };
  };

  useLayoutEffect(
    () => {
      console.log(`${videoStatus} `);
      if (videoStatus === VideoStatus.IS_LOADING) {
        const video = document.getElementsByClassName(styles.video);
        if (video[0].tagName === "DIV") return;
        console.log("restart");
        startTranslate();
      }
      if (videoStatus === VideoStatus.VIDEO_PLAYING) {
        cleanInterval();
        const video = document.getElementsByClassName(styles.video);
        const word = urls.current.shift();
        setVideoSrc(`${BASE_VIDEO_URL + word}.mp4`);
        setNotifyMessage(`\n${word}`);
        video[0].playing = true;
      }
    },
    [videoStatus]
  );

  //최초 페이지 로딩 시 초기화
  useEffect(() => {
    //로컬호스트 통신
    // BASE_URL =
    //   window.location.protocol + "//" + document.domain;
    // BASE_URL = "https://i8d204.p.ssafy.io";
    //서버 통신
    BASE_URL = `http://13.125.38.154`;

    socket.current = io.connect(`${BASE_URL}:${PORT_NUMBER}`, {
      cors: { origin: "*" },
    });
    socket.current.on("connect", function () {
      console.log("Connected...!", socket.connected);
      setNotifyMessage(START_MESSAGE);
    });
    socket.current.on("response_back", function (data) {
      console.log("response : ", data);
      countWord.current++;
      if (data === "failed") {
        setNotifyMessage(
          FAIL_MESSAGE
        );
        countWord.current--;
        translate();
      } else {
        // prevStr.current = str.current;
        // str.current += " " + data;
        str.current = data;
        setNotifyMessage(`\n${str.current}`);
        speak(data);
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
      setNotifyMessage(data);
      countWord.current = 0;
    });

    context.current = canvas.current.getContext("2d");
    startTranslate();

    return () => {
      socket.current.disconnect();
      cleanInterval();
      localStream?.getTracks()[0]?.stop();
    };
  }, []);

  //시작하기 버튼
  function startVideo(event) {
    if (event) event.preventDefault();
    const video = document.getElementsByClassName(styles.video);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        localStream = stream;
        video[0].srcObject = stream;
        video[0].play();
        setNotifyMessage(START_MESSAGE);
        setVideoStatus(VideoStatus.CAMERA_WORKING);
      })
      .catch(function (error) {});
  }

  let initedCanvas;
  //번역 시작하기
  function startTranslate(event) {
    const video = document.getElementsByClassName(styles.video);
    if (event) event.preventDefault();
    if (flag.current === 0) {
      flag.current = 1;
      //비디오 실행 후 AI 실행
      startVideo(event);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceLandmark68Net.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceRecognitionNet.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceExpressionNet.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.ssdMobilenetv1.loadFromUri(FACE_API_MODEL_LOCATION),
      ]).then(() => {
        // startVideo(event);
      });
      video[0].addEventListener("play", () => {
        console.log("addEventListener");
        // canvas를 초기화 함
        initedCanvas = faceapi.createCanvas(video[0]);
        faceapi.matchDimensions(initedCanvas, displaySize());
        // 100ms 마다 화면에 video frame이 표시 됨
        if (!interval.current) {
          console.log("setInterval");
          setVideoStatus(VideoStatus.AI_TRANSLATE_WORKING);
          interval.current = setInterval(startDetect, 1000 / 30);
        }
      });
    } 
    // else {
    //   setNotifyMessage(START_MESSAGE);
    //   translate();
    // }
  }

  // video에서 얼굴을 식별
  async function startDetect() {
    const video = document.getElementsByClassName(styles.video);
    const detections = await faceapi
      .detectAllFaces(video[0])
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

      // const boxes = faceBoxes.current;
      // let outerBoxWidth = parseInt(
      //   boxes[0].style.width.substring(0, boxes[0].style.width.length - 2)
      // );
      // let outerBoxLeft = parseInt(
      //   boxes[0].style.left.substring(0, boxes[0].style.left.length - 2)
      // );

      // if (box.x > outerBoxLeft && box.x < outerBoxLeft + outerBoxWidth) {
      //   if (box.y > 30 && box.y < 30 + outerBoxWidth) {
      //     setNotifyMessage(CORRECT_LOCATION_MESSAGE);
      //     changeColor();
      //     return;
      //   }
      // }
      //todo Delete
      clearInterval(interval.current);
      translate();
    });
  }

  function translate() {
    // _count.current = 0;
    manageDetection();
  }

  const manageDetection = () => {
    if (!detectionInterval.current) {
      console.log("setDetectionInterval");
      detectionInterval.current = setInterval(manageDetection, 300);
    }
    // if (countWord.current === 5) {
    //   clearInterval(detectionInterval.current);
    //   return;
    // } else {
    sendWebCamImage();
    // }
  };

  function sendWebCamImage() {
    const video = document.getElementsByClassName(styles.video);
    const width = video[0].width;
    const height = video[0].height;
    const image = video[0];
    // if (video[0].tagName === "DIV") return;
    // console.log('sendWebCam');
    context.current.drawImage(image, 0, 0, width, height);
    // var data = canvas.current.toDataURL("image/jpeg", 0.5);
    const data = resizeImage(image);
    context.current.clearRect(0, 0, width, height);
    if (_count.current > 5)
      socket.current.emit("image", data); //image 이벤트가 발생하면 data를 서버에 송신 data를 받기 위해 서버에서는 image 이벤트리스트를 만들놔야함
    _count.current++;
  }

  function removeWord(event) {
    event.preventDefault();
    if (videoStatus !== VideoStatus.VIDEO_PLAYING || videoStatus !== VideoStatus.IS_LOADING) {
      socket.current.emit("image", "delete");
      cleanInterval();
      startTranslate();
    }
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

  const onSpeechRecognitionHandler = (words) => {
    if (
      urls.current.length > 0 &&
      urls.current[urls.current.length - 1] === ""
    ) {
      urls.current.pop();
    }
    urls.current.push(...words);
    console.log(urls.current);
    if (urls.current.length > 0) {
      if (urls.current[0] === "") {
        urls.current.shift();
        return;
      }
      setVideoStatus(VideoStatus.VIDEO_PLAYING);
    }
  };

  const onVideoEndedHandler = (event) => {
    const video = document
      .getElementsByClassName(styles.video)[0]
      .getElementsByTagName("video")[0];
    if (event) event.preventDefault();
    if (urls.current.length > 0) {
      console.log("next", urls.current[0]);
      setVideoSrc(`${BASE_VIDEO_URL + urls.current.shift()}.mp4`);
      let playPromise = video.play();
      playPromise
        ?.then((_) => {return})
        .catch((error) => {
          console.log(error);
        });
    }
    if (urls.current.length === 0) {
      console.log("end");
      setVideoStatus(VideoStatus.IS_LOADING);
      setVideoSrc("");
    }
  };

  const renderVideo = () => {
    if(videoStatus !== VideoStatus.VIDEO_PLAYING) {
      return (<video
        className={styles.video}
        playsInline=""
        width={VIDEO_WIDTH}
        id="videoElement"
      />);
    } else {
      return (<ReactPlayer
        className={styles.video}
        playing={true} // 자동 재생 on
        muted={true} // 자동 재생 on
        controls={false} // 플레이어 컨트롤 노출 여부
        onEnded={() => onVideoEndedHandler()}
        url={vidoeSrc}
      />);
    }
  };

  return (
    <React.Fragment>
      <meta charSet="UTF-8" />
      <div className={styles.ex_layout}>
        <div className={styles.gnb}>
          수어 번역기
          <div className="item last">
            {/* <input
              type="button"
              onClick={startVideo}
              className="startButton"
              value="시작하기"
            /> */}
            {/* <input
              type="button"
              onClick={removeWord}
              className="deleteButton"
              value="단어삭제"
            /> */}
            {/* <input
              type="button"
              onClick={startTranslate}
              className="translateButton"
              value="변역하기"
            /> */}
          </div>
        </div>
        <div className={styles.main}>
          <div id={styles.container}>
            <div className={styles.splash}>
              { 
                videoStatus === VideoStatus.IS_LOADING ? (
                <MoonLoader
                  color="#FFFFFF"
                  loading={true}
                  size={100}
                  cssOverride={{
                    position: "absolute",
                    display: "flex",
                    margin: "0 auto",
                    textAlign: "center",
                    screenLeft: "50%",
                  }}
                />
              ) : (
                <React.Fragment />
              )}
            </div>
            {renderVideo()}
            <canvas id="canvas" width="0" ref={canvas} />
          </div>
          <div className={styles.footer}>
            <textarea
              className={styles.result_area}
              defaultValue={notifyMessage}
            />
          </div>
          <SpeechRecognitor
              onSpeechRecognition={onSpeechRecognitionHandler}
              BASE_URL={BASE_URL}
            />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AITranslate;
