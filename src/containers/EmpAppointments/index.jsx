import React, { Children } from "react";
import Button from "react-bootstrap/Button";
import { PageContainer } from "../../components/pageContainer";
import { EmpNavBar } from "../../components/Empnavbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Scheduler, DayView, WeekView,AgendaView,TimelineView,MonthView } from "@progress/kendo-react-scheduler";
import parse from 'html-react-parser'
import '@progress/kendo-theme-default/dist/all.css';

var zoom1 = "https://us04web.zoom.us/j/3839197009?pwd=O5yDRmWmm9QnV64e_bnzUZr4_pcLlG.1";
// This is Nate's personal zoom
var zoom2 = "https://us05web.zoom.us/j/3481873040?pwd=eVp2ZDI5MEdwS2NZc25BN0xBTGNNQT09";
// Email ksudoctorone@gmail.com
// Password Doctor123

export function EmpAppointments(props) {
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  const displayDate = new Date(new Date().toISOString())
  const [allAppointment, setAllAppointment] = useState(null);
  const [zoomLink, setZoomLink] = useState(zoom1);
  const [userFullName, setUserFullName] = useState(null);
  // const todayDate = new Date().toISOString().split("T")[0];


  useEffect(() => {
    axios.defaults.withCredentials = true;
    let arr = [];
    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log("Doctor appt page me: ", response.data);
        setEmail(response.data.email);
        setUserFullName(response.data.full_name);
        setUserID(response.data.user_id);
        response.data.userAppointment.forEach((appt) => {
          let apptStartDateTime = appt.appt_date.split('T')[0]+ "T" + appt.appt_start.split('+')[0] + '.000Z'
          // console.log("apptStartDateTime: ",apptStartDateTime)
          /**
           * console.log prints both startTime and endTime off by 4 hours.
           * On Scheduler array, it is also off by 4 hours.
           * But it shows correctly in Scheduler UI.
           */
          let startTime= new Date(apptStartDateTime);
          startTime.setHours(startTime.getHours());
          let endTime = new Date(apptStartDateTime);
          endTime.setHours(endTime.getHours()+1);
          // console.log('startTime: ', startTime)
          // console.log("endTime: ", endTime)

          arr.push({
            id: appt.appt_id,
            title: parse(`<a href = ${zoomLink} style = "color:white;"><h4>Click to join the meeting with ${appt.patient_name}</h4></a>`),
            start: startTime,
            //end date set start + 1 hour. could be changed later if the user uses new library.
            end: endTime
          })
        })
        setAllAppointment(arr);
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);

  useEffect(() => {
    document.title = "Appointments";  
  }, []);

  useEffect(() => {
    if (email === "doctor@doctor") {
        setZoomLink(zoom1);
        console.log("zoom1");
    } else {
        setZoomLink(zoom2);
        console.log("zoom2");
    }
  });   

  console.log("All appot: ", allAppointment)
  return (
    <>
      <EmpNavBar email={userFullName} />
      <PageContainer>
        <PseudoBorder>Upcoming Appointments</PseudoBorder>
        <br/>
        <Scheduler 
          style = {{maxWidth: '700px'}}
          data={allAppointment} 
          defaultDate={displayDate} 
          timezone="Etc/UTC">
          <DayView />
        </Scheduler>
      </PageContainer>
    </>
  );
}

const PseudoBorder = styled.h1`
  position: relative;
  color: black;
  display: inline-block;
  &:after {
    content: "";
    position: absolute;
    display: inline-block;
    left: 0;
    top: 100%;
    margin: 10px auto;
    width: 33%;
    height: 6px;
    background: #00f;
  }
`;

const UserAppointmentContainer = styled.div`
  display: flex;
  width: 90vw;
  margin: 30px;
`;
