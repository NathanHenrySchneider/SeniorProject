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


export function ManagePatients(props) {
    const [email, setEmail] = useState('Not logged in');
    const [userID, setUserID] = useState();
    const [fullName, setFullName] = useState();
    
    

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

    
    

    return (<>
        <EmpNavBar email={fullName + "   :    " + email} />
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
            {/* <h1 className="m-b-20 p-b-5 b-b-default f-w-600 text-center">Update Profile</h1> */}
            <div className="padding justify-content-center">
            <Container
                align="center"
            >
            
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

