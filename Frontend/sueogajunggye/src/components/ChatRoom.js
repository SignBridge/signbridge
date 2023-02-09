import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

useEffect(() => {
  const socket = new SockJS('http://localhost:8090/ws');
  const stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
    stompClient.subscribe('/topic/{recipientId}', (message) => {
      // Handle incoming messages
      console.log(message)
    });
  });
  return () => {
    stompClient.disconnect();
  };



}, []);

const sendMessage = () => {
  stompClient.send(`/app/message`, {}, JSON.stringify({
    recipientId: recipientId,
    message: message
  }));
};
