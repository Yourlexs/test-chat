import {
  useLocation,
  useHistory,
} from "react-router-dom";

import { nanoid } from "nanoid";

import { UserList } from "../components/UserList";
import { MessageList } from "../components/MessageList";
import { MessageForm } from "../components/MessageForm";

import { useChat } from "../hooks/useChat";

import styles from "./Chat.module.css";

export default function ChatPage() {
  const location = useLocation();
  const history = useHistory();
  const {users, room, username, messages, sendMessage} = useChat()

  console.log(messages)

  const onInvite = () => {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
  }

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? "/");
  };

  return (
    <div className={styles.chatContainer}>
      <header className={styles.chatHeader}>
        <h1>Chat</h1>
        <button className='btn' onClick={onInvite}>
          Invite friends
        </button>
        <button className='btn' onClick={onGoBack}>
          Leave room
        </button>
      </header>
      <main className={styles.chatMain}>
        <div className={styles.chatSidebar}>
          <h3> Room Name:</h3>
          <h2>{ room}</h2>
          <h3> Users</h3>
          <ul>
            {users.map((user) => (
              <UserList user={user} key={nanoid(8)} />
            ))}
          </ul>
        </div>
        <div className={styles.chatMessages}>
          <MessageList messages={messages }/>
        </div>
      </main>
      <MessageForm username={username} sendMessage={sendMessage}/>
    </div>
  );
}
