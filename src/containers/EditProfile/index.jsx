import React from "react";
import { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
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
import Collapse from 'react-bootstrap/Collapse'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

let set = new Set();
let index;


export function EditProfile(props) {
    const [email, setEmail] = useState('Not logged in');
    const [userID, setUserID] = useState();
    const [fullName, setFullName] = useState();
    // const [newName, setNewName] = useState();
    const [dob, setDoB] = useState();
    const [height, setHeight] = useState(); 
    const [weight, setWeight] = useState(); 
    const [doc, setDoc] = useState(); 
    const [meds, setMeds] = useState(); 
    const [allergy, setAllergy] = useState();
    const [insurance, setIns] = useState(); 
    const [groupNo, setGroupNo] = useState(); 
    const [policyHolder, setPolicyHolder] = useState(); 
    // const [chooseDoctor, setChooseDoctor] = useState();
    const [doctorList, setDoctorList] = useState([])
    const [openDoctor, setOpenDoctor] = useState(false);
    const [show, setShow] = useState(false);
    const history = useHistory(); 
    

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setEmail(response.data.email);
                setUserID(response.data.user_id);
                setFullName(response.data.full_name);
                setDoB(response.data.birthdate);
                setHeight(response.data.height);
                setWeight(response.data.weight);
                setDoc(response.data.preferred_doc);
                setMeds(response.data.meds);
                setAllergy(response.data.allergy);
                setIns(response.data.insurance);
                setGroupNo(response.data.groupId);
                setPolicyHolder(response.data.insurance_policy_holder);
                // setNewName(response.data.full_name)
    

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

    useEffect(() => {
        document.title = "Edit Your Profile";  
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("YUUUUUUUU");

        axios
        .put(
          `http://localhost:3001/user/profile/${userID}`,
          {
            // full_name: newName,
            birthdate: dob,
            height: height,
            weight: weight,
            preferred_doc: doc,
            meds: meds,
            allergy: allergy,
            insurance: insurance,
            groupId: groupNo,
            insurance_policy_holder: policyHolder
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then(function (response) {
          alert("Profile Edited");

          window.location.reload(true);
          history.goBack();
          
        })
        .catch(function (error) {
          console.log(error);
          alert("Error")
        });
    }
    const handleClickDoctor = (e) => {
        let targetIndex;
        if (e.target.id === "") targetIndex = e.target.parentElement.id;
        else targetIndex = e.target.id;
        // setChooseDoctor(targetIndex)
        setDoc(targetIndex);
        // console.log('---' + userList[targetIndex].full_name)
        setTimeout(()=>{
            setShow(true);
        },100)
    }

    return (<>
        <NavBar email={fullName} />
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
            <h1 className="m-b-20 p-b-5 b-b-default f-w-600 text-center">Update Profile</h1>
            <div className="padding justify-content-center">
            <Container
                align="center"
            >
            <FormContainer onSubmit = {e => {handleSubmit(e)}}>
                <Col >
                <div className="col-sm-8 justify-content-center text-center">
                        <h1 className="m-b-20 p-b-5 b-b-default f-w-600">Personal Information</h1>
                        <div className="row">
                            {/* <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Name</p>
                                <Input type ="text" name= "txt" placeholder={newName} disabled/>
                            </div> */}
                            <div className ="col-sm-6">
                                <p className="m-b-10 f-w-600">Email</p>
                                <Input type="email" name="email" placeholder={email}
                                    onChange = {e => setEmail(e.target.value)}/>
                            </div>
                            <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Height</p>
                                <Input type="text" name="txt" placeholder={height}
                                    onChange = {e => setHeight(e.target.value)}/>
                            </div>
                            <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Weight</p>
                                <Input type="text" name="txt" placeholder={weight}
                                    onChange = {e => setWeight(e.target.value)}/>
                            </div>
                        </div>                
                        <h1 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Allergies</h1>
                        <div className="row">   
                            <div className="col-sm-6">                
                                <Input type="text" name="txt" placeholder={allergy}
                                    onChange = {e => setAllergy(e.target.value)}/>
                            </div>
                        </div>
                        <h1 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Prefered Provider</h1>
                        <Container
                align="center"
            >
                        <div className="card-block justify-content-center ">
                        {/* <div className="col-sm-8 justify-content-center text-center"> */}
                        {/* <div className="row">    */}
                        {/* <div className="col-sm-8 justify-content-center text-center"> */}
                        {/* <Col> */}
                            <div className="col-sm-6 justify-content-center ">                
                            <Button 
            onClick={() => setOpenDoctor(!openDoctor)}
            aria-controls="collapse"
            aria-expanded={openDoctor}
            style = {{margin:'0 auto', display:'block'}}>
            {(openDoctor) ? 'Collapse List' : 'Select Doctor' }</Button>
            </div>
            <br/>
            {(openDoctor) ? <small style = {{margin: '-15px auto 8px auto', fontSize: 'large', display:'block', width:'fit-content'}}>
                Select a provider:</small> : <></>}
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
        {/* </Col> */}
                            </div>
                            {/* </div> */}
                        {/* </div> */}
                        </Container>
                        <h1 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Insurance</h1>
                        <div className="row">
                            <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Provider</p>
                            <Input type="text" name="txt" placeholder={insurance}
                                onChange = {e => setIns(e.target.value)}/>
                            </div>
                            <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Policy Holder</p>
                                <Input type="text" name="txt" placeholder={policyHolder}
                                    onChange = {e => setPolicyHolder(e.target.value)}/>
                            </div>
                            <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Group ID</p>
                                <Input type="text" name="txt" placeholder={groupNo}
                                    onChange = {e => setGroupNo(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                    <div className="col-sm-8 justify-content-center text-center">
                    <div className="card-block text-center">
                    <SubmitButton type="submit">Submit</SubmitButton>
                    </div>
                    </div>
                    </div>
                    
             {/* {err ? <Alert variant = "danger">{message}</Alert> : <></>} */}
            
            </Col>
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

