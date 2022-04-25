import React, { Children } from "react";
import Button from "react-bootstrap/Button";
import { PageContainer } from "../../components/pageContainer";
import { EmpNavBar } from "../../components/Empnavbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Scheduler, DayView, SchedulerViewItem } from "@progress/kendo-react-scheduler";
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
  const [allAppointment, setAllAppointment] = useState([]);
  const [zoomLink, setZoomLink] = useState();
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

        if(response.data.userAppointment != 0){
          response.data.userAppointment.forEach((appt) => {
            if(appt.confirmed == false){
              return;
            }
            let start = new Date(appt.start);
            let end = new Date(appt.end)
            let id = appt.id;
            let description= appt.description;
            let title = appt.title;

            arr.push({
              id: id,
              title: title,
              description: description,
              start: start,
              end: end,
            })
          })
          setAllAppointment(arr);
        }
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);

  // useEffect(() => {
  //   document.title = "Appointments";  
  // }, []);

  // useEffect(() => {
  //   if (email === "doctor@doctor") {
  //       setZoomLink(zoom1);
  //       // console.log("zoom1");
  //   } else {
  //       setZoomLink(zoom2);
  //       // console.log("zoom2");
  //   }
  // });   

  return (
    <>
      <EmpNavBar email={userFullName} />
      <PageContainer>
      {allAppointment.length == 0 ? 
        <>
          <PseudoBorder>No Upcoming Appointments</PseudoBorder>
          <br/>
          <Scheduler 
            style = {{maxWidth: '700px'}}
            data={null} 
            defaultDate={displayDate} 
            timezone="Etc/UTC"
            editable={false}
            >  
            <DayView 
              startTime={"05:00"}
              endTime={"19:00"}
              workDayStart={"08:00"}
              workDayEnd={"18:00"}
              slotDivisions={1}
              slotDuration={60}
              editable={false}
            />
          </Scheduler>
        </>
      :
        <>
          <PseudoBorder>Upcoming Appointments</PseudoBorder>
          <br/>
          <Scheduler 
            style = {{maxWidth: '700px'}}
            data={allAppointment} 
            defaultDate={displayDate} 
            timezone="Etc/UTC"
            editable={false}
            >  
            <DayView 
              startTime={"05:00"}
              endTime={"19:00"}
              workDayStart={"08:00"}
              workDayEnd={"18:00"}
              slotDivisions={1}
              slotDuration={60}
              editable={false}
            />
          </Scheduler>
        </>
      }
      
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
