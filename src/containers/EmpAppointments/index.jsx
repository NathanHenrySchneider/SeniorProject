import React, { Children } from "react";
import Button from "react-bootstrap/Button";
import { PageContainer } from "../../components/pageContainer";
import { EmpNavBar } from "../../components/Empnavbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Scheduler, DayView } from "@progress/kendo-react-scheduler";
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
  const [zoomLink, setZoomLink] = useState();
  // const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.defaults.withCredentials = true;
    let arr = [];
    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log("Doctor appt page me: ", response.data);
        setEmail(response.data.full_name);
        setUserID(response.data.user_id);
        if (email === "Doctor Smith") {
          setZoomLink(zoom1);
          console.log("zoom1");
      } else {
          setZoomLink(zoom2);
          console.log("zoom2");
      }
        response.data.userAppointment.forEach((appt) => {
          let date = new Date(appt.appt_date)
          let iso = new Date(new Date(date).setHours(date.getHours() + 1)).toISOString()
          console.log(appt.appt_date + " " + iso)

          arr.push({
            id: appt.appt_id,
            title: parse(`<a href = ${zoomLink} style = "color:white;"><h4>Click to join the meeting with ${appt.patient_name}</h4></a>`),
            start: new Date(appt.appt_date),
            //end date set start + 1 hour. could be changed later if the user uses new library.
            end: new Date(iso)
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
    if (email === "Doctor Smith") {
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
      <EmpNavBar email={email} />
      <PageContainer>
        <PseudoBorder>Upcoming Appointments</PseudoBorder>
        <br/>
        <Scheduler style = {{maxWidth: '700px'}} data={allAppointment} defaultDate={displayDate} timezone="Etc/UTC">
          <DayView />
        </Scheduler>
        {/* <UserAppointmentContainer>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "10vw" }}>
                  Appointments ID
                </th>
                <th scope="col" style={{ width: "8vw" }}>
                  Patient ID
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Patient Name
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Date
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Start
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Confirmed
                </th>
                <th scope="col" style={{ width: "10vw" }}></th>
              </tr>
            </thead>
            <tbody>
              {allAppointment
                ?
                allAppointment.sort((a, b) => b.appt_date < a.appt_date ? 1: -1).sort((a, b) => b.appt_start < a.appt_start ? 1: -1).map((item) => (
                  item.confirmed == true ?
                    (<tr key={item.appt_id}>
                      <th scope="row">{item.appt_id}</th>
                      <th scope="row">{item.patient_id}</th>
                      <th scope="row">{item.patient_name}</th>
                      <td>{item.appt_date.split("T")[0]}</td>
                      <td>{item.appt_start.split("+")[0]}</td>
                      <td>{item.confirmed ? `True` : `False`}</td>
                    </tr>) : null
                  ))
                : null
                }
            </tbody>
          </table>
        </UserAppointmentContainer> */}
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
