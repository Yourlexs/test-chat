import { useState, useEffect, useRef } from "react";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import styles from "./Home.module.css";

function HomePage() {
  // let room = localStorage.getItem('room')
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('Home')
  
  const linkRef = useRef(null);
  
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    history.push({ pathname: location.pathname });
  }, [location.pathname, history]);
  useEffect(() => {
    localStorage.setItem('username', username)
    localStorage.setItem('room', room)
  }, [username, room])

  const onChangeName = e => {
    setUsername(e.currentTarget.value)
  }
  const onChangeRoom = e => {
    setRoom(e.currentTarget.value)
  }

  const trimmed = username.trim();
  return (
    <div className={styles.joinContainer}>
      <header className={styles.joinHeader}>
        <h1> Chat</h1>
      </header>
      <main className={styles.joinMain}>
        <form>
          <div className={styles.formControl}>
            <label htmlFor="username">Username</label>
            <input
              onChange={onChangeName}
              value={username}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="room">Room</label>
            <select name="room" id="room" value={room} onChange={onChangeRoom}>
              <option value="Home">Home</option>
              <option value="Job">Job</option>
              <option value="Friends">Friends</option>
            </select>
          </div>
          {trimmed && (
            <Link
              to={{
                pathname: `${url}room`,
                state: {
                  from: {
                    location,
                  },
                },
              }}
              className={styles.btn}
              ref={linkRef}
            >
              Join Chat
            </Link>
          )}
        </form>
      </main>
    </div>
  );
}

export default HomePage;
