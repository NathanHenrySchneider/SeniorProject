import React from "react";
import Button from "react-bootstrap/Button";
import { PageContainer } from "../../components/pageContainer";
import { EmpNavBar } from "../../components/Empnavbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ScheduleSelector from "react-schedule-selector";

export function EmpAppointments(props) {
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [allAppointment, setAllAppointment] = useState(null);
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log("Doctor appt page me: ", response.data);
        setEmail(response.data.email);
        setUserID(response.data.user_id);
        setAllAppointment(response.data.userAppointment);
        getSchedule();
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);

 /**
  * ScheduleSelector onChange intake.
  */
  function handleChange(newSchedule) {
    //change the schedule
    setSchedule(newSchedule);
    setUpdated(true);
    // console.log("New schedule from handleChange method: ",newSchedule);
  }

  /**
   * Takes in selected timeslot from doctor.
   */
  function updateChanges(e) {
    // e.preventDefault();
    //actually change in the database
    if (schedule.length == 0) {
      alert("No Timeslot Selected.");
    } else {
        axios
          .post("http://localhost:3001/doctorAppTime/setAvailability", {
            avaiableSchedule: schedule,
            id: userID,
          })
          .then((response) => {
            alert("Update Success.");
            window.location.reload();
          })
          .catch((err) => {
            console.log("CHP/index.jsx" + err);
          });
        setUpdated(false);
    }
  }

  /**
   * Get the selected schedule from database after
   * updated change button is executed.
   */
  const getSchedule = () => {
      axios
        .get("http://localhost:3001/doctorAppTime/mostRecent")
        .then((response) => {
          //Retrive timeslot from db.
          const result = [...new Set([].concat(...response.data.map((o) => o.times)))]
          // console.log("result is: ", result)
          //Set the current schedule to the schedule from db.
          setSchedule(result);
        })
        .catch((err) => {
          console.log("CHP/index.jsx" + err);
        });
  };

  const showSchedule = () =>{
    console.log("Show Schedule: ", schedule)
  }

  return (
    <>
      <EmpNavBar email={email} />
      <PageContainer>
        <PseudoBorder>Your Availability:</PseudoBorder>

        <ScheduleSelector
          onChange={handleChange}
          selection={schedule}
          numDays={5}
          minTime={9}
          maxTime={18}
        />
        {updated ? (
          <Button variant="primary" onClick={updateChanges}>
            Update Changes
          </Button>
        ) : (
          <Button disabled variant="primary">
            Schedule Updated
          </Button>
        )}
        <Button onClick={showSchedule}>Show Schedule</Button>
        <PseudoBorder>Upcoming Appointments</PseudoBorder>
        <UserAppointmentContainer>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "10vw" }}>
                  Appointments ID
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Patient ID
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
                ? allAppointment.map((item) => (
                  item.appt_date.includes(todayDate) ?
                    (<tr>
                      <th scope="row">{item.appt_id}</th>
                      <th scope="row">{item.patient_id}</th>
                      <td>{item.appt_date.split("T")[0]}</td>
                      <td>{item.appt_start.split("+")[0]}</td>
                      <td>{item.confirmed ? `True` : `False`}</td>

                    </tr>): null
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
