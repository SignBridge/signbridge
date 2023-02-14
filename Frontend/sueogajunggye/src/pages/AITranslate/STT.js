import React, { Fragment, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import './STT.css';

const SpeechRecognitor = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  
//   useEffect(() => {
//     async function speechToSignLang() {
//       if (listening) return;
//       await axios
//         .get(`${props.BASE_URL}/recording/analyze?speech=${transcript}`)
//         .then((response) => {
//           props.onSpeech(response.data.trimEnd().split(' '));
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//     speechToSignLang();
//   }, [listening]);


  if (!browserSupportsSpeechRecognition) {
    return alert("Browser doesn't support speech recognition.");
  } 
  // else {
  //   SpeechRecognition.startListening({ continuous: true });
  // }
  
  let pSize = document.getElementsByClassName('pp');
  console.log(pSize)
  console.log(`음성인식로그 : ${transcript}`)
  console.log(`listening : ${listening}`)

//   const div3 = {position : this.props.div3}cf 
//   console.log(div3);
  return (
    <div className="gridSTT">
      <div className="STT-box">
        <h2>음성인식  {listening ? <div class='STT-output'>{transcript}</div> : <div className="explain-text">음성인식을 실행하시려면 Start 버튼을 클릭하고
          <br></br>다시 시도하시려면 Reset 버튼을 클릭해주세요</div>}</h2>

        {/* <div style={{display:'inline-block'}}>음성인식  {listening ? "on " : "off "}</div> */}
        <button className="start-btn" onClick={SpeechRecognition.startListening} style={{display:'inline-block', margin:'10px'}}>Start</button>
        <button className="reset-btn" onClick={resetTranscript}>Reset</button>

          {/* <div className="STT-output">{transcript}</div> */}
        {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
        {/* <div class='STT-output'>{transcript}</div> */}
      </div>
    </div>
  );
};

export default SpeechRecognitor;
