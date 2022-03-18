import React from "react";
import Button from 'react-bootstrap/Button';
import { PageContainer } from "../../components/pageContainer";
import { EmpNavBar } from "../../components/Empnavbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ScheduleSelector from 'react-schedule-selector'



export function EmpAppointments(props) {
  
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const[updated, setUpdated] = useState(false);
  const [allAppointment, setAllAppointment]= useState(null);
  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setEmail(response.data.email);
        setUserID(response.data.user_id);
        setAllAppointment(response.data.allAppointment)
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);
  
  function handleChange(newSchedule){
    //change the schedule
    setSchedule(newSchedule)
    setUpdated(true)
    console.log(newSchedule);
  }
  function updateChanges(){
    //actually change in the database
    
    setUpdated(false);
  }
  return (
    <>
      <EmpNavBar email={email} />
      <PageContainer>
        <PseudoBorder>Your Availability:</PseudoBorder>
      
        <ScheduleSelector onChange = {handleChange} selection = {schedule}/>
        {updated ? <Button variant="primary" onClick = {updateChanges}>Update Changes</Button>
        : <Button disabled variant="primary">Schedule Updated</Button>}
        <PseudoBorder>Upcoming Appointments</PseudoBorder>
        <UserAppointmentContainer>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" style={{width: "10vw"}}>Appointments ID</th>
                <th scope="col" style={{width: "10vw"}}>Patient ID</th>
                <th scope="col" style={{width: "10vw"}}>Date</th>
                <th scope="col" style={{width: "10vw"}}>Start</th>
                <th scope="col" style={{width: "10vw"}}>End</th>
                <th scope="col" style={{width: "10vw"}}>Doctor</th>
                <th scope="col" style={{width: "10vw"}}>Confirmed</th>
                <th scope="col" style={{width: "10vw" }}></th>
              </tr>
            </thead>
            <tbody>
            {allAppointment? allAppointment.map((item)=>(
              <tr>
                <th scope="row">{item.appt_id}</th>
                <th scope="row">{item.patient_id}</th>
                <td>{item.appt_date.split("T")[0]}</td>
                <td>{item.appt_start.split("+")[0]}</td>
                <td>{item.appt_end}</td>
                <td>Null</td>
                <td>{item.confirmed ? `True`: `False`}</td>
                <td>
                        <div class="dropdown">
                          <a
                            class="btn btn-secondary dropdown-toggle"
                            href="#"
                            role="button"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >Action</a>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li>
                              <a class="dropdown-item" href="#">View</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">Update</a>
                            </li>
                            <li>
                              <a class="dropdown-item" href="#">Cancel</a>
                            </li>
                          </ul>
                        </div>
                      </td>
              </tr>
            )) : null}
            </tbody>
          </table>

        </UserAppointmentContainer>
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

// const FormContainer = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 90vw;
//   margin-left: 40px;
// `;
// const Title = styled.h1`
//   font-size: 16px;
//   width: 200px;
// `;

// const Input = styled.input`
//   width: 220px;
//   margin-bottom: 5px;
// `;
// const ReasonInput = styled.textarea`
//   width: 300px;
//   height: 100px;
//   margin-bottom: 5px;
// `;

// const Select = styled.select`
//   padding: 5px;
//   width: 150px;
// `;

// const Option = styled.option``;

// const Submit = styled.button`
//   display: flex;
//   justify-content: center;
//   width: 100px;
//   border-radius: 5px;
//   margin-top: 30px;
//   background-color: white;
//   transition: all 0.5s ease;

//   &:hover {
//     background-color: #e9f5f5;
//     transform: scale(1.02);
//   }
// `;

const UserAppointmentContainer = styled.div`
  display: flex;
  width: 90vw;
  margin: 30px;
`;
