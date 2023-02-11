import React, { Fragment, useEffect, useLayoutEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicNoneIcon from "@mui/icons-material/MicNone";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./SpeechRecognitor.module.css";
import { Link } from "react-router-dom";
// import { border, style } from "@mui/system";
const VOICE_PORT_NUMBER = 5001;
const SpeechRecognitor = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript !== "") props.onSpeech(`\n${transcript}`);
  }, [transcript]);

  useLayoutEffect(() => {
    async function speechToSignLang() {
      if (listening) {
        return;
      }
      await axios
        .get(
          `${props.BASE_URL}:${VOICE_PORT_NUMBER}/ai/recording/analyze?speech=${transcript}`
        )
        .then((response) => {
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
    SpeechRecognition.startListening();
  };

  return (
    <div className={styles.container}>
      <IconButton
        color="primary"
        onClick={onClickListener}
        aria-label="voiceTranslate"
        size="large"
        style={{
          backgroundColor: "white",
        }}
      >
        {listening ? (
          <MicIcon className={styles.icon} />
        ) : (
          <MicNoneIcon className={styles.icon} />
        )}
      </IconButton>
      <Link to="/">
        <IconButton
          onClick={onClickListener}
          aria-label="voiceTranslate"
          size="large"
          style={{
            backgroundColor: "red",
            marginLeft: "8px",
          }}
        >
          <ClearIcon className={styles.icon} sx={{ color: "white" }} />
        </IconButton>
      </Link>
    </div>
  );
};

export default SpeechRecognitor;
