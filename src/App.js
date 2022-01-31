
import './App.css';
import { CustomerHomePage } from './containers/CustomerHomePage';
import { EmployeeHomePage } from './containers/EmployeeHomePage';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import {AccountBox} from "./accountBox";
import { EmployeeBox } from "./employeeBox";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={AccountBox} />
          <Route path="/EmployeeLogin" exact component={EmployeeBox} />
          <Route path="/CustomerHomePage" exact component={CustomerHomePage} />
          <Route path="/EmployeeHomePage" exact component={EmployeeHomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

