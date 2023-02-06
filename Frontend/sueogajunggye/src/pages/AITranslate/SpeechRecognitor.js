import React, {Fragment, useEffect} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from "axios";


const SpeechRecognitor = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  axios.get(`http://52.78.101.29:5000/recording/analyze`, {
    "speech": transcript,
  })
    .then(response => {
      console.log(response.config.speech);
    })
    .catch(error => {
      console.log(error);
    });

  if (!browserSupportsSpeechRecognition) {
    return alert("Browser doesn't support speech recognition.");
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechRecognitor;
