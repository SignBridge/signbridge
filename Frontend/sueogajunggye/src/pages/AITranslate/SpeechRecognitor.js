import React, { Fragment, useLayoutEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicNoneIcon from "@mui/icons-material/MicNone";

const VOICE_PORT_NUMBER = 5001;
const SpeechRecognitor = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useLayoutEffect(() => {
    async function speechToSignLang() {
      if (listening) {
        props.onSpeech(listening)
        return
      };
      await axios
        .get(`${props.BASE_URL}:${VOICE_PORT_NUMBER}/ai/recording/analyze?speech=${transcript}`)
        .then((response) => {
          props.onSpeech(listening)
          props.onSpeechRecognition(response.data.split(" "));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    speechToSignLang();
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return alert("Browser doesn't support speech recognition.");
  }

  const onClickListener = () => {
    props.onClean();
    SpeechRecognition.startListening();
  }

  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      <IconButton
        color="primary"
        onClick={onClickListener}
        aria-label="voiceTranslate"
      >
        {listening ? <MicIcon /> : <MicNoneIcon />}
      </IconButton>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechRecognitor;
