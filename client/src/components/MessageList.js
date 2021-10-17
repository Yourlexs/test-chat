import { useRef, useEffect } from 'react'
import { nanoid } from "nanoid";

import styles from "./MessageList.module.css";

export const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages])

  return (
    <>
      {
        messages.map((msg) => (
          <div className={styles.message}  key={nanoid(9)}>
            <p className={styles.meta}>{msg.username} <span>{msg.time}</span></p>
            <p className={styles.text}>{msg.text}</p>
          </div>
        ))
      }
    </>
  );
};
