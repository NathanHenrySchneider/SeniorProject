import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { NavBar } from "../../components/navbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";

export function Appointments(props) {
  
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  const [userAppointment, setUserAppointment]= useState(null);
  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setEmail(response.data.email);
        setUserID(response.data.user_id);
        setUserAppointment(response.data.userAppointment)
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);

  let history = useHistory();
  const [err, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(null);
  const [reason, setReason] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const appt_date = date.split("T")[0];
    const appt_start = date.split("T")[1];
    // console.log("apptDate: ", appt_date);
    // console.log("apptStart: ", appt_start);
    // console.log("reason is:", reason)
    // console.log("doctor is:", doctor)
    console.log("appointment is:", userAppointment)
    axios
      .post(
        "http://localhost:3001/appointment",
        {
          appt_date: appt_date,
          appt_start: appt_start,
          appt_end: appt_start, //need to be fix to 30 after appt_start time.
          reason: reason,
          patient_id: userID,
          provider_id: 2, //manually added.
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response)
        // history.push("/CustomerHomePage");
      })
      .catch(function (error) {
        setError(true);
        console.log(error)
        if (error.response) setMessage(error.response.data);
        else setMessage("Something went wrong.");
      });
  };


  return (
    <>
      <NavBar email={email} />
      <PageContainer>
        <PseudoBorder>Make Your Appointment</PseudoBorder>
        <FormContainer
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          autoComplete="off"
        >
          <Title style={{ marginTop: "30px" }}>Reason for appointment:</Title>
          <ReasonInput
            name="text"
            onChange={(e) => {
              setReason(e.target.value);
            }}
          />
          <Title style={{ marginTop: "20px" }}>Appointment Date:</Title>
          <Input
            type="datetime-local"
            id="appointment-time"
            name="appointment-time"
            min="2022-02-07T00:00"
            max="2022-12-30T00:00"
            style={{ padding: "5px" }}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <Title style={{ marginTop: "20px" }}>Doctor:</Title>
          <Select
            onChange={(e) => {
              setDoctor(e.target.value);
            }}
          >
            <Option disabled selected>
              Doctor Name
            </Option>
            <Option>Doctor 1</Option>
            <Option>Doctor 2</Option>
            <Option>Doctor 3</Option>
            <Option>Doctor 4</Option>
            <Option>Doctor 5</Option>
          </Select>
          {date == null ? <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Please add appointment time.</Tooltip>}>
            <span className="d-inline-block">
              <Button disabled style={{ pointerEvents: 'none', marginTop: "30px" }}>
                Schedule
              </Button>
            </span>
          </OverlayTrigger> : <Button type = "submit">
                Schedule
          </Button>}
        </FormContainer>

        <UserAppointmentContainer>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" style={{width: "10vw"}}>Appointments ID</th>
                <th scope="col" style={{width: "10vw"}}>Date</th>
                <th scope="col" style={{width: "10vw"}}>Start</th>
                <th scope="col" style={{width: "10vw"}}>End</th>
                <th scope="col" style={{width: "10vw"}}>Doctor</th>
                <th scope="col" style={{width: "10vw"}}>Confirmed</th>
              </tr>
            </thead>
            <tbody>
            {userAppointment? userAppointment.map((item)=>(
              <tr>
                <th scope="row">{item.appt_id}</th>
                <td>{item.appt_date.split("T")[0]}</td>
                <td>{item.appt_start.split("+")[0]}</td>
                <td>{item.appt_end}</td>
                <td>Null</td>
                <td>{item.confirmed ? `True`: `False`}</td>
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
  width: 150px;
`;

const Option = styled.option``;

const Submit = styled.button`
  display: flex;
  justify-content: center;
  width: 100px;
  border-radius: 5px;
  margin-top: 30px;
  background-color: white;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.02);
  }
`;

const UserAppointmentContainer = styled.div`
  display: flex;
  width: 90vw;
  margin: 30px;
`;
