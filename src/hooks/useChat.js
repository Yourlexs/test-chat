import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5000";
export const useChat = () => {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [room, setRoom] = useState(localStorage.getItem('room'))

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.emit("joinRoom", { username, room });

    socketRef.current.on("message", (message) => {
      setMessages([...messages, message]);
    });
    
    socketRef.current.on("roomUsers", ({ room, users }) => {
      setRoom(room)
      setUsers(users);
    });
    
    return () => {
      socketRef.current.disconnect();
    };
  }, [username, room]);

  const sendMessage = (text) => {
    socketRef.current.emit("chatMessage", text);
  };

  return {users, username, room, messages, sendMessage}
};
