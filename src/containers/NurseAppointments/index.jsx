import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { EmpNavBar } from "../../components/Empnavbar";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ScheduleSelector from "react-schedule-selector";
import Button from "react-bootstrap/Button";
import { Appointments } from "./../Appointments/index";

export function NurseAppointments(props) {
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  const [allAppointment, setAllAppointment] = useState(null);
  const [doctorList, setDoctorList] = useState(null);
  const [actions, setActions] = useState();

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log("Nurse appt page me: ", response.data);
        setEmail(response.data.email);
        setUserID(response.data.user_id);
        setAllAppointment(response.data.userAppointment);
        setDoctorList(response.data.allDoctor);
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);

  /*********************************************************************************
   * Below are operation related to ScheduleSelector
   *
   *********************************************************************************/
  const [schedule, setSchedule] = useState([]);
  const [updated, setUpdated] = useState(false);

  /* ScheduleSelector onChange intake.*/
  function handleChange(newSchedule) {
    //change the schedule
    setSchedule(newSchedule);
    setUpdated(true);
    // console.log("New schedule from handleChange method: ",newSchedule);
  }

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

  /**
   * Update the selected doctor availability .
   */
  function updateDoctorSchedule(e) {
    //actually change in the database
    if (schedule.length == 0) {
      alert("No Timeslot Selected.");
    } else {
      axios
        .post("http://localhost:3001/doctorAppTime/setAvailability", {
          avaiableSchedule: schedule,
          id: selectedDoctorID,
        })
        .then((response) => {
          getNewestAvailability();
          alert("Update Success.");
          window.location.reload(true);
        })
        .catch((err) => {
          console.log("CHP/index.jsx" + err);
        });
      setUpdated(false);
    }
  }

  /**
   * After a doctor availability is updated, call to DB to get the newest schedule.
   */
  const getNewestAvailability = () => {
    axios
      .post("http://localhost:3001/doctorAppTime/mostRecent", {
        doctorID: selectedDoctorID,
      })
      .then((response) => {
        //Retrive timeslot from db.
        const result = [
          ...new Set([].concat(...response.data.map((o) => o.times))),
        ];
        console.log("result is: ", result);
        //Set the current schedule to the schedule from DB.
        setSchedule(result);
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  };

  /**
   * todatDate: display appointment only today and onward.
   * Convert date from m/d/yyyy to yyyy/mm//dd
   */
  let todayDate = new Date().toLocaleDateString();
  todayDate =
    todayDate.slice(4, 8) +
    "-0" +
    todayDate.slice(0, 1) +
    "-0" +
    todayDate.slice(2, 3);

  /**
   * Display selected doctor schedule.
   */
  const [selectedDoctorForAppt, setSelectedDoctorForAppt] = useState("viewAll");
  // console.log("selectedDoctorForAppt: ", selectedDoctorForAppt);

  return (
    <>
      <EmpNavBar email={email} />
      <PageContainer>
        <PseudoBorder>Set Doctor Availability:</PseudoBorder>

        <Select
          defaultValue
          style={{ marginTop: "15px" }}
          onChange={(e) => setSelectedDoctorID(e.target.value)}
        >
          <Option value="">Select A Doctor</Option>
          {doctorList
            ? doctorList.map((doctor) => (
                <Option key={doctor.user_id} value={doctor.user_id}>
                  {doctor.full_name}
                </Option>
              ))
            : null}
        </Select>

        <ScheduleSelector
          onChange={handleChange}
          selection={schedule}
          numDays={5}
          minTime={9}
          maxTime={18}
        />
        {selectedDoctorID ? (
          <Button variant="primary" onClick={updateDoctorSchedule}>
            Update Changes
          </Button>
        ) : null}

        <PseudoBorder>Upcoming Appointments</PseudoBorder>

        <Select
          defaultValue={"DEFAULT"}
          style={{ marginTop: "15px", width: "220px" }}
          onChange={(e) => setSelectedDoctorForAppt(e.target.value)}
        >
          <Option value="DEFAULT" disabled>
            View Specific
          </Option>
          <Option value="viewAll">View All Appointments</Option>
          {doctorList
            ? doctorList.map((doctor) => (
                <Option key={doctor.user_id} value={doctor.user_id}>
                  {doctor.full_name}
                </Option>
              ))
            : null}
        </Select>

        <UserAppointmentContainer>
          <table class="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "10vw" }}>
                  Appointments ID
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
                  Doctor
                </th>
                <th scope="col" style={{ width: "10vw" }}>
                  Confirmed
                </th>
                <th scope="col" style={{ width: "10vw" }}></th>
              </tr>
            </thead>

            {selectedDoctorForAppt === "viewAll" ? (
              <>
                <tbody>
                  {allAppointment
                    ? allAppointment.sort((a, b) => b.appt_start > a.appt_start ? 1: -1).sort((a, b) => b.appt_date < a.appt_date ? 1: -1).map((item) =>
                        item.appt_date >= todayDate ? (
                          <tr key={item.appt_id}>
                            <th scope="row">{item.appt_id}</th>
                            <th>{item.patient_name}</th>
                            <td>{item.appt_date.split("T")[0]}</td>
                            <td>{item.appt_start.split("+")[0]}</td>
                            <td>{item.doctor_name}</td>
                            <td>{item.confirmed ? `True` : `False`}</td>
                            <td>
                              <div class="dropdown">
                                <div>
                                  <select
                                    value={actions}
                                    onChange={(e) => setActions(e.target.value)}
                                  >
                                    <option selected value="Action">
                                      Select
                                    </option>
                                    <option value="approve">Approve</option>
                                    <option value="update">Update</option>
                                    <option value="view">View</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : null
                      )
                    : null}
                </tbody>
              </>
            ) : (
              <>
                <tbody>
                  {allAppointment
                    ? allAppointment.sort((a, b) => b.appt_date < a.appt_date ? 1: -1).sort((a, b) => b.appt_start < a.appt_start ? 1: -1).map((item) =>
                        (item.appt_date >= todayDate) &&
                        (item.doctor_id == selectedDoctorForAppt) ? (
                          <tr key={item.appt_id}>
                            <th scope="row">{item.appt_id}</th>
                            <th>{item.patient_name}</th>
                            <td>{item.appt_date.split("T")[0]}</td>
                            <td>{item.appt_start.split("+")[0]}</td>
                            <td>{item.doctor_name}</td>
                            <td>{item.confirmed ? `True` : `False`}</td>
                            <td>
                              <div class="dropdown">
                                <div>
                                  <select
                                    value={actions}
                                    onChange={(e) => setActions(e.target.value)}
                                  >
                                    <option selected value="Action">
                                      Select
                                    </option>
                                    <option value="approve">Approve</option>
                                    <option value="update">Update</option>
                                    <option value="view">View</option>
                                  </select>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : null
                      )
                    : null}
                </tbody>
              </>
            )}
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
