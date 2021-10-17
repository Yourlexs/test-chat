import { useState } from 'react'
import styles from './MessageForm.module.css'

export const MessageForm = ({sendMessage}) => {
  const [text, setText] = useState('')
  
  const handleChangeText = e => setText(e.target.value)

  const handleSendMessage = (e) => {
    e.preventDefault();
    let msg = text.trim();
    if (!msg) {
      return false;
    }
    sendMessage(text)
    setText("");
  };

  return (
    <div className={styles.chatFormContainer}>
        <form onSubmit={handleSendMessage}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
          autoComplete="off"
          value={text}
            onChange={handleChangeText}
          />
          <button type="submit" className="btn"> Send </button>
        </form>
      </div>
  )
}