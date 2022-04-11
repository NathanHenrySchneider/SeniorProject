import React from "react";
import Button from "react-bootstrap/Button";
import { PageContainer } from "../../components/pageContainer";
import { EmpNavBar } from "../../components/Empnavbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import ScheduleSelector from "react-schedule-selector";

export function EmpAppointments(props) {
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  // const [schedule, setSchedule] = useState([]);
  // const [updated, setUpdated] = useState(false);
  const [allAppointment, setAllAppointment] = useState(null);
  // const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log("Doctor appt page me: ", response.data);
        setEmail(response.data.full_name);
        setUserID(response.data.user_id);
        setAllAppointment(response.data.userAppointment);
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);

  return (
    <>
      <EmpNavBar email={email} />
      <PageContainer>
        <PseudoBorder>Upcoming Appointments</PseudoBorder>
        <UserAppointmentContainer>
          <table class="table">
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
                    <tr key={item.appt_id}>
                      <th scope="row">{item.appt_id}</th>
                      <th scope="row">{item.patient_id}</th>
                      <th scope="row">{item.patient_name}</th>
                      <td>{item.appt_date.split("T")[0]}</td>
                      <td>{item.appt_start.split("+")[0]}</td>
                      <td>{item.confirmed ? `True` : `False`}</td>
                    </tr>
                  ))
                : null}
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
