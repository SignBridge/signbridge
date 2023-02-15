import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import './STT.css';

const SpeechRecognitor = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();


  if (!browserSupportsSpeechRecognition) {
    return alert("Browser doesn't support speech recognition.");
  } 

  
  return (
    <div className="gridSTT">
      <div className="STT-box">
        <h2>음성인식  {listening ? <div class='STT-output'>{transcript}</div> : <div className="explain-text">음성인식을 실행하시려면 Start 버튼을 클릭하고
          <br></br>다시 시도하시려면 Reset 버튼을 클릭해주세요</div>}</h2>
        <button className="start-btn" onClick={SpeechRecognition.startListening} style={{display:'inline-block', margin:'10px'}}>Start</button>
        <button className="reset-btn" onClick={resetTranscript}>Reset</button>
      </div>
    </div>
  );
};

export default SpeechRecognitor;
