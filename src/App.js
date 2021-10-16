import { lazy, Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';

const HomePage = lazy(() => import('./views/HomePage.js'));
const ChatPage = lazy(() => import('./views/ChatPage.js'));

function App() {
  return (
      <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route path="/" exact>
            <HomePage/>
          </Route>

          <Route path="/room" exact>
            <ChatPage/>
          </Route>

        </Switch>
      </Suspense>
            </>
      );
}

export default App;