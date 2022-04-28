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
import { NotifyButton } from "../../accountBox/common";

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
  const [upcomingAppt, setUpcomingAppt] = useState(false);
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
        let tempZoomLink = "";
        if (email === "doctor@doctor") {
          setZoomLink(zoom1);
          tempZoomLink = zoom1;
          console.log("zoom1");
        } else {
          setZoomLink(zoom2);
          tempZoomLink = zoom1;
          console.log("zoom2");
        }
        let foundNext = false;

        if(response.data.userAppointment !== 0){
          response.data.userAppointment.forEach((appt) => {
            if(appt.confirmed === false){
              return;
            }
            let start = new Date(appt.start);
            let end = new Date(appt.end)
            let id = appt.id;
            let description= appt.description;
            
            let title = parse(`<h5><a href = ${tempZoomLink} style = "color:white;"><i>Click to join </i><b>${appt.title}</b> with <b>${appt.patient_name}</b></a></h5>`);

            if (!foundNext & end > new Date(new Date().setDate(new Date().getDate()))){
              setUpcomingAppt(appt);
              foundNext = true;
            } 

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

  useEffect(() => {
    if (email === "doctor@doctor") {
        setZoomLink(zoom1);
        console.log("zoom1");
    } else {
        setZoomLink(zoom2);
        console.log("zoom2");
    }
  });   

  return (
    <>
      <EmpNavBar email={userFullName} />
      <PageContainer>
        <br/>
      {allAppointment.length === 0 ? 
        <>
          <PseudoBorder style={{marginBottom: "40px"}}>No Upcoming Appointments</PseudoBorder>
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
          <PseudoBorder style={{marginBottom: "40px"}}>Upcoming Appointments</PseudoBorder>
          <br/>
          <NotificationButton>
          <NotifyButton
              // style={{ border: "none", background: "none" }}
              onClick={() => {
                if (allAppointment && allAppointment.length > 0) {
                  // console.log(allAppointment[allAppointment.length - 1].title.props.children.props.children[1].props.children)
                  console.log(allAppointment[0].start)
                  axios
                    .post("http://localhost:3001/send-sms", {  phone_number: "7706332309", text_content: `This is a reminder about your appointment ${upcomingAppt.title} scheduled for ${new Date(upcomingAppt.start)} with ${userFullName}.`})
                    .then(function (response) {
                      alert("Patient notified"); 
                    })
                    .catch((err) => {
                      console.log("CHP/index.jsx" + err);
                  });
                }
              }}
            >
              <div>Notify your next patient</div>
            </NotifyButton>
            </NotificationButton>
            <br/>
          <Scheduler 
            style = {{maxWidth: '700px'}}
            data={allAppointment} 
            defaultDate={displayDate} 
            // timezone="Etc/UTC"
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
      <br/>
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

const NotificationButton = styled.div`
  display: flex;
  width: 350px;
  height: 50px;
`;
