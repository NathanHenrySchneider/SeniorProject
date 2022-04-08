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


export function EditProfileEmployee(props) {
    const [email, setEmail] = useState('Not logged in');
    const [fullName, setFullName] = useState();
    const [dob, setDoB] = useState(); 
    const [allergy, setAllergy] = useState();
    

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setEmail(response.data.email)
                setFullName(response.data.full_name);
                setAllergy(response.data.allergy);

            })
            .catch((err) => {
                console.log("CHP/index.jsx" + err);
            })
    }, [])

    return (<>
        <NavBar email={fullName + "   :    " + email} />
        <PageContainer>
        <div class="page-content page-container" id="page-content">
        <Container
            align="center"
        >
        <Col 
            align="center"
        >
        <div class="padding justify-content-center">
            <div class="row d-flex justify-content-center text-center">
            <div class="card user-card-full justify-content-center">
            <h1 class="m-b-20 p-b-5 b-b-default f-w-600 text-center">Update Profile</h1>
            <div class="padding justify-content-center">
            <Container
                align="center"
            >
            <FormContainer onSubmit = {e => {}}>
                <Col >
                <div class="col-sm-8 justify-content-center text-center">
                        <h1 class="m-b-20 p-b-5 b-b-default f-w-600">Personal Information</h1>
                        <div class="row">
                            <div class="col-sm-6">
                                <p class="m-b-10 f-w-600">Name</p>
                                <Input type ="text" name= "txt" placeholder="Full Name" 
                                    onChange = {e => [setFullName(e.target.value)]}/>
                            </div>
                            <div class ="col-sm-6">
                                <p class="m-b-10 f-w-600">Email</p>
                                <Input type="email" name="email" placeholder="Email"
                                    onChange = {e => setEmail(e.target.value)}/>
                            </div>
                          
                        </div>                
                        <h1 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Allergies</h1>
                        <div class="row">   
                            <div class="col-sm-6">                
                                <Input type="text" name="txt" placeholder="Allergies"
                                    onChange = {e => setAllergy(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                    <div class="card-block text-center">
                    <SubmitButton type="submit">Submit</SubmitButton>
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

