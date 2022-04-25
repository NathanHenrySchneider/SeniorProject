import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { NavBar } from "../../components/navbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import parse from 'html-react-parser';
import { Scheduler, DayView } from "@progress/kendo-react-scheduler";
import {  guid } from "@progress/kendo-react-common";

var zoom1 = "https://us04web.zoom.us/j/3839197009?pwd=O5yDRmWmm9QnV64e_bnzUZr4_pcLlG.1";
// This is Nate's personal zoom
var zoom2 = "https://us05web.zoom.us/j/3481873040?pwd=eVp2ZDI5MEdwS2NZc25BN0xBTGNNQT09";
// Email ksudoctorone@gmail.com
// Password Doctor123

export function Appointments(props) {
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  const [userFullName, setUserFullName] = useState(null);
  const [assignedDocName, setAssignedDocName] = useState();
  const [userAppointment, setUserAppointment] = useState([]);
  const [assignedDoctor, setAssignedDoctor] = useState("");
  const [allAppointment, setAllAppointment] = useState([]);
  const displayDate = new Date(new Date().toISOString());
  let doctors = [];


  useEffect(() => {
    axios.defaults.withCredentials = true;
    let arr = [];

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        setEmail(response.data.email);
        setUserID(response.data.user_id);
        setUserFullName(response.data.full_name);
        setUserAppointment(response.data.userAppointment);
        setAssignedDoctor(response.data.assigned_doctor_id);
        // getSchedule();

        //Retrive appt schedule
        if(response.data.userAppointment.length != 0){
          response.data.userAppointment.forEach((appt) => {
            let start = new Date(appt.start);
            let end = new Date(appt.end)
            let id = appt.id;
            let description= appt.description;
            let title = appt.title;

            arr.push({
              id: id,
              title: parse(`<h5>${title}</h5>`),
              description: description,
              start: start,
              end: end,
            })
          })
          setAllAppointment(arr);
        }

      })
      .catch((err) => {
        console.log("customer homepage index.jsx" + err);
      });

      if(assignedDoctor){
        axios.get(`http://localhost:3001/user/find/${assignedDoctor}`, { withCredentials: true })
        .then((response) => {
          console.log(response)
            setAssignedDocName(response.data[0].full_name)
        }).catch((err) => {
            console.log("CHP/index.jsx" + err);
        });
    }

    axios
      .get("http://localhost:3001/user/findAll")
      .then((response) => {
        response.data.forEach((element) => {
          if (element.user_type === "doctor") {
            doctors.push({ id: element.user_id, name: element.full_name });
          }
        });
        // setDoctorList(doctors);
      })
      .catch((err) => {
        console.log("customer homepage index.jsx" + err);
      });
  }, [assignedDoctor]);
  useEffect(() => {
    document.title = "Appointments";  
  }, []);
  
  /**
   * Intake for Scheduler
   * @param {created} param0 
   */
  const handleDataChange = ({ created }) =>{
    //add UNCONFIRM postfix to appt title.
    created[created.length-1].title += " -UNCONFIRMED"
    let genID= guid();
    // console.log("guid is: ", genID)
    // console.log("created: ", created)
    setAllAppointment((old) =>
      old.concat( // Add the newly created items and assign an `id`.
          created.map((item) =>
            Object.assign({}, item, {
              id: genID,
            })
          )
        )
    );

    bookAppt({created, genID});
    window.location.reload();
  }
  /**
   * HandleChange for Scheduler
   */
  const bookAppt = ({created, genID}) =>{
    let apptDate = new Date(created[0].start).toISOString().split("T")[0];
    let start = new Date(created[0].start).toString();
    let end = new Date(created[0].end).toString();
    let description = created[0].description;
    let id= genID;
    let title = created[0].title;
    //Current date time.
    let dateTime = new Date().toLocaleString();
    // console.log("dateTime: ", dateTime);

    axios
    .post(
      "http://localhost:3001/appointment",
      {
        appt_date: apptDate,
        start: start,
        description: description,
        patient_id: userID,
        doctor_id: assignedDoctor,
        date_time: dateTime,
        patient_name: userFullName,
        end: end,
        id: id,
        title, title,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    .then(function (response) {
      console.log("book appointment func: ",response.data);
      // alert("Appointment Booked");
      // updateSchedule(response.data);
      // window.location.reload(true);
      // return false; //prevent refreshing page
    })
    .catch(function (error) {
      setError(true);
      console.log(error);
      if (error.response) setMessage(error.response.data);
      else setMessage("Something went wrong.");
    });
  }




  const [err, setError] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <NavBar email={userFullName} />
      <PageContainer>

      {assignedDoctor ?
        <>
        <br/>
          <PseudoBorder>Your doctor {assignedDocName}'s calendar:</PseudoBorder>
          <br/>
          <h3><i>Double click on timeslot to request an appointment:</i></h3>
          <h3><i>You will get notified once the nurse confirms the appointment.</i></h3>
          <br/>
          <Scheduler 
            style = {{maxWidth: '700px'}} 
            data={allAppointment} 
            onDataChange={handleDataChange}
            defaultDate={displayDate} 
            timezone="Etc/UTC"
            editable={false}
            >
            <DayView 
              startTime={"08:00"}
              endTime={"18:00"}
              workDayStart={"08:00"}
              workDayEnd={"18:00"}
              slotDivisions={1}
              editable={{
                add: true,
                remove: false,
                drag: false,
                resize: false,
                edit: false,
            }}
            />
          </Scheduler>
        </>
          : 
          <h2 style={{textAlign: 'center', marginTop: '100px'}}>Doctor not assigned. Please contact us.</h2>
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 90vw;
  margin-left: 40px;
`;
const Title = styled.h1`
  font-size: 16px;
  width: 200px;
`;

const Input = styled.input`
  width: 220px;
  margin-bottom: 5px;
`;
const ReasonInput = styled.textarea`
  width: 300px;
  height: 100px;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 5px;
  width: 200px;
`;

const Option = styled.option``;

const UserAppointmentContainer = styled.div`
  display: flex;
  width: 90vw;
  margin: 30px;
  padding: 10px;
  border: 2px solid #e4e4e4;
  border-radius: 10px;
`;
