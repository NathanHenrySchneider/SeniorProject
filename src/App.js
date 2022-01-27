import './App.css';
import styled from 'styled-components';
import { AccountBox } from './accountBox';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from './dashboard';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Router>
      <Switch>
        <AppContainer>
            <Route exact path="/" component={AccountBox} />
            <Route exact path="/dashboard" component={Dashboard} />
        </AppContainer>
      </Switch>
    </Router>
  );
}

export default App;
