import './App.css';
import styled from 'styled-components';
import { AccountBox } from './accountBox';

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
    <AppContainer>
      <AccountBox/>
    </AppContainer>
  );
}

export default App;
