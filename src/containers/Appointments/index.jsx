import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { NavBar } from "../../components/navbar";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Modal } from "react-bootstrap";
import ScheduleSelector from "react-schedule-selector";

export function Appointments(props) {
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  const [userAppointment, setUserAppointment] = useState(null);
  const [show, setShow] = useState(false);
  const [doctorList, setDoctorList] = useState(null);
  let doctors = [];
  const todayDate = new Date().toISOString().split("T")[0];

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setEmail(response.data.email);
        setUserID(response.data.user_id);
        setUserAppointment(response.data.userAppointment);
        getSchedule();
      })
      .catch((err) => {
        console.log("customer homepage index.jsx" + err);
      });
    axios
      .get("http://localhost:3001/user/findAll")
      .then((response) => {
        response.data.forEach((element) => {
          if (element.user_type === "doctor") {
            doctors.push({ id: element.user_id, name: element.full_name });
          }
        });
        setDoctorList(doctors);
      })
      .catch((err) => {
        console.log("customer homepage index.jsx" + err);
      });
  }, []);

  // let history = useHistory();
  const [err, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState(null);
  const [reason, setReason] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Check if user alraedy have 3 appointment.
    // if (userAppointment.length > 10) {
    //   return alert("Max 3 appointment allowed");
    // }

    // const appt_date = date.split("T")[0];
    // console.log("date is: ", date);
    // console.log("datetime is: ", datetime);

    axios
      .post(
        "http://localhost:3001/appointment",
        {
          appt_date: date,
          appt_start: datetime,
          reason: reason,
          patient_id: userID,
          provider_id: selectedDoctorID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("Appointment Booked");
        window.location.reload(false);
        // setDate(null)
        // history.push("/CustomerHomePage");
      })
      .catch(function (error) {
        setError(true);
        console.log(error);
        if (error.response) setMessage(error.response.data);
        else setMessage("Something went wrong.");
      });
  };

  /**
   * Schedule operation below.
   */
  const [schedule, setSchedule] = useState([]);
  const [datetime, setDatetime] = useState(null);

  //Get the selected schedule from database after
  const getSchedule = () => {
    axios
      .post("http://localhost:3001/doctorAppTime/mostRecent", {
        doctorID: selectedDoctorID,
      })
      .then((response) => {
        //Retrive timeslot from db.
        const result = [
          ...new Set([].concat(...response.data.map((o) => o.times))),
        ];
        //Set the current schedule to the schedule from db.
        setSchedule(result);

        // console.log("timeslot is: ", result);
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  };

  //Display avaiable time for the date selected in Modal.
  let avaiableDate = []; //date not modify, ahead by 4 hour.
  let timeToShow = []; //date modify, shows the correspond time.
  var timestamp;

  //When user choose a specific date, extract only the selected date from the whole timeslot.
  //And modify the time to display correctly instead of ahead by 4 hours.
  const dateValid = () => {
    avaiableDate = schedule.filter((item) => item.includes(date));
    // console.log("result is: ", result)
    if (avaiableDate.length === 0) return false;
    else {
      for (let i = 0; i < avaiableDate.length; i++) {
        timestamp = new Date(avaiableDate[i]);
        timestamp.setHours(timestamp.getHours() - 4);
        var timeToString = JSON.stringify(timestamp);
        timeToShow.push(timeToString.substring(12, 20));
      }
      // console.log("timetoshow: ", timeToShow)
      return true;
    }
  };

  /**
   * Get the doctor schedule from DB based on doctor selected.
   * Will not run on first render, only make axios call when a doctor is selected.
   */
  const [selectedDoctorID, setSelectedDoctorID] = useState(null);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    axios
      .post("http://localhost:3001/doctorAppTime/mostRecent", {
        doctorID: selectedDoctorID,
      })
      .then((response) => {
        //Retrive timeslot from db.
        const result = [
          ...new Set([].concat(...response.data.map((o) => o.times))),
        ];
        //Set the current schedule to the schedule from db.
        setSchedule(result);
        // console.log("timeslot is: ", result);
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, [selectedDoctorID]);

  return (
    <>
      <NavBar email={email} />
      <PageContainer>
        <PseudoBorder> Available Timeslot:</PseudoBorder>

        <Select
          defaultValue
          style={{ marginTop: "15px" }}
          onChange={(e) => setSelectedDoctorID(e.target.value)}
        >
          <Option value="">Select A Doctor</Option>
          {doctorList
            ? doctorList.map((doctor) => (
                <Option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </Option>
              ))
            : null}
        </Select>

        <ScheduleSelector
          // onChange={handleScheduleSelector}
          selection={schedule}
          numDays={5}
          minTime={9}
          maxTime={18}
        />

        <Button variant="primary" onClick={handleShow}>
          Make an Appointment
        </Button>
        <PseudoBorder style={{ marginTop: "15px" }}>Appointments</PseudoBorder>

        <UserAppointmentContainer>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "10vw" }}>
                  Appointment ID
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Date
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Start
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Doctor
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Reason
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Confirmed
                </th>
                <th scope="col" style={{ width: "10vw" }}></th>
              </tr>
            </thead>
            <tbody>
              {userAppointment
                ? userAppointment.map((item) =>
                    /*Shows appointment only today and onward */
                    item.appt_date.includes(todayDate) ? (
                      <tr>
                        <th scope="row">{item.appt_id}</th>
                        <td>{item.appt_date.split("T")[0]}</td>
                        <td>{item.appt_start.split("+")[0]}</td>
                        <td>{item.provider_id}</td>
                        <td>{item.reason ? item.reason : "Not Specified"}</td>
                        <td>{item.confirmed ? `True` : `False`}</td>
                        <td>
                          {/* <div class="dropdown">
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
                        </div> */}
                        </td>
                      </tr>
                    ) : null
                  )
                : null}
            </tbody>
          </table>
        </UserAppointmentContainer>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormContainer
              onSubmit={(e) => {
                handleSubmit(e);
                handleClose();
              }}
              autoComplete="off"
            >
              <Title style={{ marginTop: "30px" }}>
                Reason for appointment:
              </Title>
              <ReasonInput
                name="text"
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
              <Title style={{ marginTop: "20px" }}>Date and Time:</Title>

              <Input
                type="date"
                id="appointment-time"
                name="appointment-time"
                min="2022-02-07T00:00"
                max="2022-12-30T00:00"
                style={{ padding: "5px" }}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              {date && dateValid() ? (
                <Select
                  onChange={(e) => {
                    setDatetime(e.target.value);
                  }}
                >
                  <Option value="">Select A Timeslot</Option>
                  {timeToShow.map((item) => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              ) : (
                <Select>
                  <Option></Option>
                </Select>
              )}
              {date == null ? (
                <span className="d-inline-block">
                  <Button
                    disabled
                    style={{
                      pointerEvents: "none",
                      width: "auto",
                      marginTop: "30px",
                    }}
                  >
                    Schedule
                  </Button>
                </span>
              ) : (
                <Button type="submit" style={{ width: "fit-content" }}>
                  Schedule
                </Button>
              )}
            </FormContainer>
          </Modal.Body>
        </Modal>
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

const UserAppointmentContainer = styled.div`
  display: flex;
  width: 90vw;
  margin: 30px;
  padding: 10px;
  border: 2px solid #e4e4e4;
  border-radius: 10px;
`;
