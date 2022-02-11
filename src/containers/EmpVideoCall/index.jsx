import React from "react";
import { useState, useEffect } from "react";
import { EmpNavBar } from "../../components/Empnavbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import zoomIcon from "../../images/zoom_logo.png";
import axios from 'axios';

export function EmpVideoCall(props) {
    const [email, setEmail] = useState('Not logged in');
    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me-doctor', { withCredentials: true })
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