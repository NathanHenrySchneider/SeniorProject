import React from "react";
import { useState, useEffect } from "react";
import { EmpNavBar } from "../../components/Empnavbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';
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


export function ManagePatients(props) {
    const [email, setEmail] = useState('Not logged in');
    const [userID, setUserID] = useState();
    const [fullName, setFullName] = useState();
    const [patientList, setPatientList] = useState([])
    const [doctorList, setDoctorList] = useState([])
    const [show, setShow] = useState(false);
    const [openDoctor, setOpenDoctor] = useState(false);
    

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
                if(element.user_type === 'doctor'){
                    arr.push({
                        user_id : element.user_id,
                        full_name: element.full_name,
                        email: element.email,
                    })
                }
            })

            setPatientList(arr);
            console.log(patientList)
        })
    }, [])

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

