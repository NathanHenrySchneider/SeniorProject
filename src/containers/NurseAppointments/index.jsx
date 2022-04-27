import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { EmpNavBar } from "../../components/Empnavbar";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import './style.css';
import { Scheduler, DayView } from "@progress/kendo-react-scheduler";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import './style.css';
import accountIcon from "../../images/account.png";
import { Button, Form, FormControl } from "react-bootstrap";

export function NurseAppointments(props) {
  const [email, setEmail] = useState("Not logged in");
  const [userID, setUserID] = useState(null);
  const [allAppointment, setAllAppointment] = useState([]);
  const [doctorList, setDoctorList] = useState(null);
  const [userFullName, setUserFullName] = useState(null);
  const [selectedDoctorID, setSelectedDoctorID] = useState(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log("Nurse appt page me: ", response.data);
        setEmail(response.data.email);
        setUserFullName(response.data.full_name);
        setUserID(response.data.user_id);
        // setAllAppointment(response.data.userAppointment);
        setDoctorList(response.data.allDoctor);
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);

  useEffect(() => {
    document.title = "Appointments";  
  }, []);




const displayDate = new Date(new Date().toISOString())
/**
 * Get schedule when doctor is selected.
 */
useEffect(()=>{
  if(selectedDoctorID != null){
    axios
    .get(`http://localhost:3001/doctorAppTime/${selectedDoctorID}`)
    .then((response) => {
      // console.log("get appt response: ", response.data)
      showAppt(response);
    })
    .catch((err) => {
      console.log("CHP/index.jsx" + err);
    });
  }
}, [selectedDoctorID])

/**
 * Show scheudle if exist.
 */
const showAppt= (response) =>{
  let arr=[]
  if(response.data !== []){
    response.data.forEach((appt) => {
      let start = new Date(appt.start);
      let end = new Date(appt.end)
      let id = appt.id;
      let description= appt.description;
      let title = appt.title;

      arr.push({
        id: id,
        title: title,
        description: description,
        start: start,
        end: end,
      })
    })
    setAllAppointment(arr)
  }
}

/**
   * Intake for Scheduler
   * @param {created} param0 
   */
 const handleDataChange = ({updated, deleted }) =>{
  if(updated.length !== 0){
    if(!updated[0].title.includes("-UNCONFIRMED")){
      updateApptConfirm({updated});
    }
  }else if(deleted.length !== 0){
    deleteApptConfirm({deleted});
  }
}

/**
 * Mark appt confirmation to true, update db.
 * @param {updated} param0 
 */
const updateApptConfirm = ({updated})=>{
  let textTitle = "";
  let textDate = "";
  axios
    .put('http://localhost:3001/appointment/nurseUpdateAppt', {
      id: updated[0].id,
      title: updated[0].title,
    })
    .then((response) => {
      console.log("updateApptConfirm response: ", response.data)
      textTitle = response.data[0].title;
      textDate =  response.data[0].appt_date;
      setAllAppointment((old) =>
      old // Find and replace the updated items
        .map(
          (item) => updated.find((current) => (
            current.id === item.id),
            ) || item
        )
    );
    axios
        .post("http://localhost:3001/send-sms", {  phone_number: "7706332309", text_content: `Your appointment ${textTitle} sheduled for ${textDate} has been confirmed.`})
        .catch((err) => {
          console.log("CHP/index.jsx" + err);
        });
    })
    .catch((err) => {
      console.log("CHP/index.jsx" + err);
    });
}

/**
 * delete appt, update to db.
 * @param {deleted} param0 
 */
const deleteApptConfirm = ({deleted})=>{
  let id= deleted[0].id;

  axios
    .delete(`http://localhost:3001/appointment/nurseDeleteAppt/${id}`)
    .then((response) => {
      console.log("deleteApptConfirm response: ", response.data)
      setAllAppointment((old) =>
        old // Filter the deleted items
          .filter(
            (item) =>
              deleted.find((current) => current.id === item.id) === undefined
          )
      );
    })
    .catch((err) => {
      console.log("CHP/index.jsx" + err);
    });
}

const textInput = useRef(null);
  const [listDoctor, setListDoctor] = useState([]);
  const [nameDoctor, setNameDoctor] = useState('');

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 390 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 390, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const searchDoctor = (event) => {
    event.preventDefault()
    const doctorName = textInput.current.value
    axios
      .post("http://localhost:3001/doctorAppTime/searchDoctor", {
        doctorName: doctorName,
      })
      .then((response) => {
        setListDoctor(response.data);
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  };

  const imageClick = (e) => {
    setNameDoctor(e.item.full_name);
    setSelectedDoctorID(e.item.user_id);
  }


return (
    <>
      <EmpNavBar email={userFullName} />
      <PageContainer>
      <br/>
      <PseudoBorder>Manage Appointments:</PseudoBorder>
      <br/>
      <h4>To Confirm: <i>Double click the appointment block to remove '-UNCONFIRMED' tag.</i></h4>
      <h4>To Reject: <i>Click the 'x' on the top right corner of appointment block</i></h4>
      
      <Form className="d-flex m-2" onSubmit={searchDoctor}>
        <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" ref={textInput} style={{position: "relative"}}/>
        <Button variant="outline-success" onClick={searchDoctor}>Search</Button>
      </Form>
      <div className="col-xs-12 cardcont nopadding">
        <div className="wrapper">
          <h3>Doctor Availability</h3>
          <Carousel responsive={responsive} autoPlay={false} shouldResetAutoplay={false}>
            {listDoctor.map((item) => (
              <div className="col-md-12">
                <div className="responsive-circle">
                  <img src={accountIcon} className="image-cover" alt="" onClick={() => imageClick({ item })} />
                  <figcaption>{item.full_name}</figcaption>
                </div>
              </div>
            ))}
          </Carousel>
          <h3>Doctor Chosen: {nameDoctor}</h3>
        </div>
      </div>

        {selectedDoctorID ? 
          <Scheduler 
            style = {{maxWidth: '700px'}} 
            data={allAppointment} 
            defaultDate={displayDate} 
            timezone="Etc/UTC"
            onDataChange={handleDataChange}
            editable={true}
            >
            <DayView 
              // startTime={"05:00"}
              // endTime={"19:00"}
              workDayStart={"08:00"}
              workDayEnd={"18:00"}
              slotDivisions={1}
              editable={{
                add: false,
                remove: true,
                drag: false,
                resize: false,
                select: true,
                edit: true,
              }}
            />
          </Scheduler>
        : 
        <Scheduler 
            style = {{maxWidth: '700px'}} 
            data={null} 
            defaultDate={displayDate} 
            timezone="Etc/UTC"
            editable={true}
            >
            <DayView 
              // startTime={"05:00"}
              // endTime={"19:00"}
              workDayStart={"08:00"}
              workDayEnd={"18:00"}
              slotDivisions={1}
              editable={true}
            />
          </Scheduler>}
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