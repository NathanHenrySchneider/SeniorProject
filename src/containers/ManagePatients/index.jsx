import React from "react";
import { useState, useEffect } from "react";
import { EmpNavBar } from "../../components/Empnavbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';
// import React, { useContext, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, SubmitButton } from "../../accountBox/common";
import { Marginer } from  "../../components/marginer";//"../components/marginer"
import { AccountContext } from "../../accountBox/accountContext";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import { Container, Col } from 'react-grid';
import ScrollableFeed from 'react-scrollable-feed'
import Collapse from 'react-bootstrap/Collapse'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

let index
let messageArr = [];
let set = new Set();
let activeUsers = [];
let nameMap = new Map();

export function ManagePatients(props) {
    const [email, setEmail] = useState('Not logged in');
    const [userID, setUserID] = useState();
    const [fullName, setFullName] = useState();
    const [fetched, setFetched] = useState(false);
    // const [email, setEmail] = useState("Not logged in");
    // const [userID, setUserID] = useState(-1);
    const [allMessages, setAllMessages] = useState([])
    const [loading, setLoading] = useState(true);
    // const [fullName, setFullName] = useState();
    const [mapDone, setMapDone] = useState(false);
    const [userList, setUserList] = useState([])
    const [patientList, setPatientList] = useState([])
    const [doctorList, setDoctorList] = useState([])
    const [show, setShow] = useState(false);
    const [composeTo, setComposeTo] = useState();
    const [openPatient, setOpenPatient] = useState(false);
    const [openDoctor, setOpenDoctor] = useState(false);
    const [choosePatient, setChoosePatient] = useState();
    const [chooseDoctor, setChooseDoctor] = useState();
    
    

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setEmail(response.data.email);
                setUserID(response.data.user_id);
                setFullName(response.data.full_name);
               
    

            })
            .catch((err) => {
                console.log("CHP/index.jsx" + err);
            })

    }, [])
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
        .get("http://localhost:3001/all-users")
        .then((response) =>{
            let arr = [];
            response.data.forEach((element) => {
                if(!set.has(element.user_id)&&(element.user_type === 'patient')){
                    arr.push({
                        user_id : element.user_id,
                        full_name: element.full_name,
                        email: element.email,
                        user_type: element.user_type
                    })
                }
            })
            setPatientList(arr);
            console.log(patientList)
        })
    }, [])
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
        .get("http://localhost:3001/all-users")
        .then((response) =>{
            let arr = [];
            response.data.forEach((element) => {
                if(!set.has(element.user_id)&&(element.user_type === 'doctor')){
                    arr.push({
                        user_id : element.user_id,
                        full_name: element.full_name,
                        email: element.email,
                        user_type: element.user_type
                    })
                }
            })
            setDoctorList(arr);
            console.log(doctorList)
        })
    }, [])
    const handleClickPatient = (e) => {
        let targetIndex;
        if (e.target.id === "") targetIndex = e.target.parentElement.id;
        else targetIndex = e.target.id;
        setChoosePatient(targetIndex)
        // console.log('---' + userList[targetIndex].full_name)
        setTimeout(()=>{
            setShow(true);
        },100)
    }
    const handleClickDoctor = (e) => {
        let targetIndex;
        if (e.target.id === "") targetIndex = e.target.parentElement.id;
        else targetIndex = e.target.id;
        setChooseDoctor(targetIndex)
        // console.log('---' + userList[targetIndex].full_name)
        setTimeout(()=>{
            setShow(true);
        },100)
    }
    const handleClose = () => {
        setShow(false);
      };
    const handleSubmit = (e) => {
        console.log("SUBMIT")
    };
    

    return (<>
        <EmpNavBar email={fullName} />
        <PageContainer>
        <div className="page-content page-container" id="page-content">
        <Container
            align="center"
        >
        <Col 
            align="center"
        >
        <div className="padding justify-content-center">
            <div className="row d-flex justify-content-center text-center">
            <div className="card user-card-full justify-content-center">
            <h1 className="m-b-20 p-b-5 b-b-default f-w-600 text-center">Manage Patients</h1>
            <div className="padding justify-content-center">
            <Container
                align="center"

            >
            <FormContainer onSubmit = {e => {handleSubmit(e)}}>
            <Button 
            onClick={() => setOpenPatient(!openPatient)}
            aria-controls="collapse"
            aria-expanded={openPatient}
            style = {{margin:'0 auto', display:'block'}}>
            {(openPatient) ? 'Collapse List' : 'Select Patient' }</Button>
            <br/>
            {(openPatient) ? <small style = {{margin: '-15px auto 8px auto', fontSize: 'large', display:'block', width:'fit-content'}}>
                Select a patient:</small> : <></>}
        <Collapse in={openPatient}>
            <div id="collapse">
            <ListGroup as="ol" numbered>
                {patientList.map((user) => {
                    index++;
                    return(
                    <ListGroup.Item
                        key = {index}
                        id = {index}
                        action
                        as="li"
                        onClick = {(e)=>handleClickPatient(e)}
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold" id = {user.user_id}>{user.full_name}</div>
                        {user.email}
                        </div>
                        <Badge bg="primary" pill>
                        {user.user_type} #{user.user_id}
                        </Badge>
                    </ListGroup.Item>
                    )
                })}

            </ListGroup>
            </div>
        </Collapse>
        <Button 
            onClick={() => setOpenDoctor(!openDoctor)}
            aria-controls="collapse"
            aria-expanded={openDoctor}
            style = {{margin:'0 auto', display:'block'}}>
            {(openDoctor) ? 'Collapse List' : 'Select Doctor' }</Button>
            <br/>
            {(openDoctor) ? <small style = {{margin: '-15px auto 8px auto', fontSize: 'large', display:'block', width:'fit-content'}}>
                Select a patient:</small> : <></>}
        <Collapse in={openDoctor}>
            <div id="collapse">
            <ListGroup as="ol" numbered>
                {doctorList.map((user) => {
                    index++;
                    return(
                    <ListGroup.Item
                        key = {index}
                        id = {index}
                        action
                        as="li"
                        onClick = {(e)=>handleClickDoctor(e)}
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold" id = {user.user_id}>{user.full_name}</div>
                        {user.email}
                        </div>
                        <Badge bg="primary" pill>
                        {user.user_type} #{user.user_id}
                        </Badge>
                    </ListGroup.Item>
                    )
                })}

            </ListGroup>
            </div>
        </Collapse>
        <SubmitButton type="submit">Submit</SubmitButton>
        </FormContainer>
            </Container>
            </div>
            </div>
            </div>
        </div>
        </Col>
        </Container>
        </div>
        </PageContainer>
    </>
    );
}

