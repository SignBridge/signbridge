export const speak = async (str) => {
    const synth = window.speechSynthesis;
    const voice = synth.getVoices()?.[0];
    if (synth.speaking) synth.cancel();
    if (str !== '') {
        const utterance = new SpeechSynthesisUtterance(str);
        utterance.pitch = 1;
        utterance.rate = 1;
        utterance.voice = voice;
        synth.speak(utterance);
    }
};