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
    let pSize = document.getElementsByClassName('pp')
    console.log(pSize)
//   const div3 = {position : this.props.div3}
//   console.log(div3);
  return (
    <div className="gridSTT"> 
      <p style={{display:'inline-block'}}>음성인식  {listening ? "on " : "off "}</p>
      <button onClick={SpeechRecognition.startListening} style={{display:'inline-block', margin:'10px'}}>Start</button>

      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      <button onClick={resetTranscript}>Reset</button>
      <p class='pp' style={{margin:'0px', 'overflowY':'scroll'}}>{transcript}
      1111111111111111111111111111111111
      1
      1
      1
      1
      1111
      1
      1
      1
      1
      1
      1

      1
      1
      1
      1
      1
      1
      11111111111111111111111111111111111111111
      1111111111111111111111111111111
      1111111111111111111111111111111
      3fsssssssssssssssss
      ssssssssssss
      ssssssssssssss
      ssssssssssssssssssss
      sssssssssssssssssssss
      ssssssssssssssssssssss
      ssssssssssssssssssssssssssssss
      sssssssssssssssssssssssssssssssss
      ssssssssssssssssssssssssssssssssss
      sssssssssssssssssssssss
      11111111111111111111111111111111
      1111111111111111111111111111
      1111111111111111111111111111
      3211111111fssssssssssssssssssssssssssss
      afsssssssssssssssssssssssssssssss
      faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      fassssssssssssssssssssssssssssssss
      fasdddddddddddddddddddddddddddd
      fasssssssssssssss</p>
    </div>
  );
};

export default SpeechRecognitor;
