import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { NavBar } from "../../components/navbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

export function Appointments(props) {
  const [email, setEmail] = useState("Not logged in");
  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setEmail(response.data.email);
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);
  

  const [date, setDate] = useState(null);
  return (
    <>
      <NavBar email={email} />
      <PageContainer>
        <PseudoBorder>Make Your Appointment</PseudoBorder>
        <DateTimePicker>
          <input
            type="datetime-local"
            id="appointment-time"
            name="appointment-time"
            min="2022-02-07T00:00"
            max="2022-12-30T00:00"
          />
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

const DateTimePicker = styled.div`
  display: flex;
  margin-top: 30px;
`;
