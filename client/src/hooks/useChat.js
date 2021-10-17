import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5000";
export const useChat = () => {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [room, setRoom] = useState(localStorage.getItem('room'))

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.emit("joinRoom", { username, room });

    socketRef.current.emit('getMessages')

    socketRef.current.on("message", (message) => {
      setMessage(message);
    });

    socketRef.current.on("roomUsers", ({ room, users }) => {
      setRoom(room)
      setUsers(users);
    });
    
    return () => {
      socketRef.current.disconnect();
    };
  }, [room, username]);

  const sendMessage = (text) => {
    socketRef.current.emit("chatMessage", text);
  };

  return {users, username, room, message, sendMessage}
};
