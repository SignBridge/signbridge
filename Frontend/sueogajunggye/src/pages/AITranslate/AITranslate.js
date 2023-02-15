import React, {
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

const FACE_API_MODEL_LOCATION = process.env.PUBLIC_URL + "/models";
const START_MESSAGE = "\n번역을 시작합니다.\n\n얼굴, 어깨, 팔꿈치, 손이 보이도록\n기기를 배치해주세요.";
const FAIL_MESSAGE = "\n단어 인식에 실패하였습니다.\n\n얼굴, 어깨, 팔꿈치, 손이 보이도록\n기기를 배치해주세요.";
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 480;
let BASE_URL = "https://i8d204.p.ssafy.io";
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
  const socket = useRef();
  const canvas = useRef();
  const context = useRef();
  const prevStr = useRef();
  const _count = useRef(0);
  const interval = useRef();
  const countWord = useRef(0);
  const urls = useRef([]);
  const detectionInterval = useRef();
  const [videoStatus, setVideoStatus] = useState(VideoStatus.IS_LOADING);
  const [notifyMessage, setNotifyMessage] = useState();
  const [vidoeSrc, setVideoSrc] = useState();

  const cleanInterval = () => {
    if (interval.current !== undefined) {
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
      if (videoStatus === VideoStatus.IS_LOADING) {
        setNotifyMessage('\n로딩 중...\n\n잠시만 기다려주세요.');
        const video = document.getElementsByClassName(styles.video);
        if (video[0].tagName === "DIV") return;
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

  useEffect(() => {
    BASE_URL = `https://i8d204.p.ssafy.io`;

    socket.current = io.connect(`${BASE_URL}`, {
      cors: { origin: "*" },
    });
    socket.current.on("connect", function () {
      setNotifyMessage('\nAI 서버 연결\n\n잠시만 기다려주세요.');
    });
    socket.current.on("response_back", function (data) {
      countWord.current++;
      if (data === "failed") {
        setNotifyMessage(
          FAIL_MESSAGE
        );
        countWord.current--;
        translate();
      } else {
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
  function startTranslate(event) {
    const video = document.getElementsByClassName(styles.video);
    if (event) event.preventDefault();
    if (flag.current === 0) {
      flag.current = 1;
      startVideo(event);
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceLandmark68Net.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceRecognitionNet.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.faceExpressionNet.loadFromUri(FACE_API_MODEL_LOCATION),
        faceapi.nets.ssdMobilenetv1.loadFromUri(FACE_API_MODEL_LOCATION),
      ]).then(() => {
      });
      video[0].addEventListener("play", () => {
        initedCanvas = faceapi.createCanvas(video[0]);
        faceapi.matchDimensions(initedCanvas, displaySize());
        if (!interval.current) {
          setVideoStatus(VideoStatus.AI_TRANSLATE_WORKING);
          interval.current = setInterval(startDetect, 1000 / 30);
        }
      });
    } 
  }

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
    resizedDetections.forEach((detection) => {
      const box = detection.detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, { label: "Face" });
      drawBox.draw(initedCanvas);
      clearInterval(interval.current);
      translate();
    });
  }

  function translate() {
    manageDetection();
  }

  const manageDetection = () => {
    if (!detectionInterval.current) {
      detectionInterval.current = setInterval(manageDetection, 300);
    }
    sendWebCamImage();
  };

  function sendWebCamImage() {
    const video = document.getElementsByClassName(styles.video);
    const width = video[0].width;
    const height = video[0].height;
    const image = video[0];
    context.current.drawImage(image, 0, 0, width, height);
    const data = resizeImage(image);
    context.current.clearRect(0, 0, width, height);
    if (_count.current > 5)
      socket.current.emit("image", data); 
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
    var dataURI = resizeCanvas.toDataURL("image/jpeg", 0.5);
    return dataURI;
  };

  const onSpeechHandler = (props) => {
    setNotifyMessage(props);
  }

  const onSpeechRecognitionHandler = (words) => {
    if (
      urls.current.length > 0 &&
      urls.current[urls.current.length - 1] === ""
    ) {
      urls.current.pop();
    }
    urls.current.push(...words);
    if (urls.current.length > 0) {
      if (urls.current[0] === "") {
        urls.current.shift();
        setNotifyMessage(START_MESSAGE)
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
      const word = urls.current.shift()
      setVideoSrc(`${BASE_VIDEO_URL + word}.mp4`);
      setNotifyMessage(`\n${word}`);
      let playPromise = video.play();
      playPromise
        ?.then((_) => {return})
        .catch((error) => {
          console.log(error);
        });
    }
    if (urls.current.length === 0) {
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
        playing={true} 
        muted={true} 
        controls={false} 
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
              onSpeech={onSpeechHandler}
              onSpeechRecognition={onSpeechRecognitionHandler}
              BASE_URL={BASE_URL}
            />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AITranslate;
