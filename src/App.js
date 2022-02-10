
import './App.css';
import React from 'react';
import { CustomerHomePage } from './containers/CustomerHomePage';
import { EmployeeHomePage } from './containers/EmployeeHomePage';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { AccountBox } from "./accountBox";
import { EmployeeBox } from "./employeeBox";
import { YourProfile } from './containers/YourProfile';
import { Appointments } from './containers/Appointments';
import { VideoCall } from './containers/VideoCall';
import { Chat } from './containers/Chat';
import { Documents } from './containers/Documents';
import { EmpAppointments } from './containers/EmpAppointments';
import { EmpVideoCall } from './containers/EmpVideoCall';
import { EmpChat } from './containers/EmpChat';
import { EmpYourProfile } from './containers/EmpYourProfile';
import { EmpDocuments } from './containers/EmpDocuments';



function App() {
 
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={AccountBox} />
          <Route path="/EmployeeLogin" exact component={EmployeeBox} />
          <Route path="/customerhomepage" exact component={CustomerHomePage} />
          <Route path="/customerhomepage/yourprofile" exact component={YourProfile} />
          <Route path="/customerhomepage/appointments" exact component={Appointments}/>
          <Route path="/customerhomepage/videocall" exact component={VideoCall}/>
          <Route path="/customerhomepage/chat" exact component={Chat}/>
          <Route path="/customerhomepage/documents" exact component={Documents}/>
          <Route path="/EmployeeHomePage" exact component={EmployeeHomePage} />
          <Route path="/EmployeeHomePage/empvideocall" exact component={EmpVideoCall}/>
          <Route path="/EmployeeHomePage/empchat" exact component={EmpChat}/>
          <Route path="/EmployeeHomePage/EmpYourProfile" exact component={EmpYourProfile}/>
          <Route path="/Employeehomepage/EmpDocuments" exact component={EmpDocuments}/>
          <Route path="/Employeehomepage/EmpAppointments" exact component={EmpAppointments}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

