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

// function SpeechRecognitor() {

//     useEffect(() => {
//         setAxios();
//         if (!("webkitSpeechRecognition" in window)) {
//           alert("Chrome만 지원됩니다.");
//         }  else {
//           console.log('음성인식 가능');
//           const speech = new webkitSpeechRecognition;
    
//           // document.getElementById("start").addEventListener("click", () => {
//           //     speech.start();
//           // })
    
//           // document.getElementById("stop").addEventListener("click", () => {
//           //     speech.stop();
//           // })
    
//           // speech.addEventListener("result", (envet) => {
//           //     const {transcript} = event["results"][0][0];
//           //     console.log(transcript);
    
//           //     axios.get(BASE_URL + '/recording/analyze', {
//           //       "speech": transcript,
//           //     })
//           //       .then(response => {
//           //         console.log(response.data);
//           //       })
//           //       .catch(error => {
//           //         console.log(error);
//           //       });
//           // })
//       }
//     }, []);

//     const setAxios = () => {
//         axios.defaults.baseURL = BASE_URL + "/recording/analyze";
//         axios.defaults.withCredentials = true;
//       };    

//     return (
//         <React.Fragment>

//         </React.Fragment>
//     );
// } 
