import './App.css';
import { HomePage } from './containers/HomePage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AccountBox} from "./accountBox";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={AccountBox} />
          <Route path="/dashboard" exact component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

