import React from "react";
import { useState, useEffect } from "react";
import { EmpNavBar } from "../../components/Empnavbar";
import styled from "styled-components";
import PatientList from "./PatientList"
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';

export function ManagePatients(props) {
    const [email, setEmail] = useState('Not logged in');
    const [userID, setUserID] = useState();
    const [fullName, setFullName] = useState();
    const [doctorList, setDoctorList] = useState([])
    const [loaded, setLoaded] = useState(false);
    

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

            setDoctorList(arr);
            setLoaded(true)
            // console.log(patientList)
        })
    }, [])

    useEffect(() => {
        document.title = "Manage Patients";  
      }, []);

    if(!loaded) return<h1>Loading</h1>
    return (<>
        <EmpNavBar email={fullName} />
        <PageContainer>
        <br/>
        <PseudoBorder> Manage Patients:</PseudoBorder>
        <hr/>
        <div className="page-content page-container" id="page-content">
        {doctorList.map((doc) => (
            <PatientList key = {doc.user_id} doctorID = {doc.user_id} doctorName = {doc.full_name}/>
        ))}
        </div>
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

