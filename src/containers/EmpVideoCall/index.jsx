import React from "react";
import { useState, useEffect } from "react";
import { EmpNavBar } from "../../components/Empnavbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import zoomIcon from "../../images/zoom_logo.png";
import axios from 'axios';

// zoom
// import jwt from jwt;
// import requests from jwt;
// import time from time;

// API_KEY = 'mrvk446IRhyc6dFFxOoOfQ'
// API_SEC = 'cvaBfMFpQDOT9TfFOq6TeW6xGOS7TZGyslLl'
// API_CHT = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVQmxkVklRNlNUV1lHQ1JRdjV3cExRIn0.u4k2eoi6_JgtuNfOO8N8VgXluJIMP_bKOBNuKnkwvks'
// JWT_TOK = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Im1ydms0NDZJUmh5YzZkRkZ4T29PZlEiLCJleHAiOjE2NDY3OTgyNTMsImlhdCI6MTY0Njc5Mjg1M30.V6fpiEXIlAiNRWzK5n0CA1a2rhKtZvQbkQdZQ6RSyBo'

// function generateToken() {
//     const payload = {
//         iss: config.APIKey,
//         exp: (new Date()).getTime() + 5000
//     };
    
//     const token = jwt.sign(payload, config.APISecret);
//     return token;
// }


export function EmpVideoCall(props) {
    const [email, setEmail] = useState('Not logged in');
    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setEmail(response.data.email)
            })
            .catch((err) => {
                console.log("CHP/index.jsx" + err);
            })
    }, [])

    return (<>
        <EmpNavBar email={email} />
        <PageContainer>
            <div class="card-block text-center">
                <div class="m-b-25"> <img src={zoomIcon} alt="zoom icon" class="img-radius" /> </div>
                <div>
                    <p class="m-b-10 f-w-600">Patient</p>
                    <h6 class="text-muted f-w-400">FirstName LastName</h6>
                </div>
                <div>
                    <p class="m-b-10 f-w-600">Time</p>
                    <h6 class="text-muted f-w-400">12:00 PM</h6>
                </div>
                <div>
                    <p class="m-b-10 f-w-600">Date</p>
                    <h6 class="text-muted f-w-400">mm/dd/yyyy</h6>
                </div>
                <button class="btn btn-primary" type="submit">Launch Meeting</button>
            </div>
        </PageContainer>
    </>
    );
}