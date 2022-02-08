import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { NavBar } from "../../components/navbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function Appointments(props) {
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setEmail(response.data.email);
        setUserID(response.data.user_id)
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);

  let history = useHistory();
  const [err, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const appt_date = date.split("T")[0];
    const appt_start = date.split("T")[1];
    console.log("apptDate: ", appt_date);
    console.log("apptStart: ", appt_start);
    axios
      .post(
        "http://localhost:3001/appointment",
        {
          appt_date: appt_date,
          appt_start: appt_start,
          appt_end: appt_start, //need to be fix to 30 after appt_start time.
          patient_id: userID,
          provider_id: 2    //manually added.
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
          history.push("/CustomerHomePage");
      })
      .catch(function (error) {
        setError(true);
        if (error.response) setMessage(error.response.data);
        else setMessage("Something went wrong.");
      });
  };

  return (
    <>
      <NavBar email={email} />
      <PageContainer>
        <PseudoBorder>Make Your Appointment</PseudoBorder>
        <DateTimePicker
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="datetime-local"
            id="appointment-time"
            name="appointment-time"
            min="2022-02-07T00:00"
            max="2022-12-30T00:00"
            style={{ margin: "10px" }}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <Submit>Schedule</Submit>
        </DateTimePicker>
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

const DateTimePicker = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const Submit = styled.button`
  display: flex;
  justify-content: center;
  width: 100px;
`;
