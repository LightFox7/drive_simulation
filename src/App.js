import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// pages
import AppPage from './pages/app';
import NotFoundPage from './pages/404';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/404" component={NotFoundPage} />
        <Route exact path="/" component={AppPage} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
