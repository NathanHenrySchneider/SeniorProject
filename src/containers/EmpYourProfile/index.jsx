import React from "react";
import { useState, useEffect } from "react";
import { EmpNavBar } from "../../components/Empnavbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';
import { Link} from "react-router-dom";


export function EmpYourProfile(props) {
    const [email, setEmail] = useState('Not logged in');
    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setEmail(response.data.full_name)
            })
            .catch((err) => {
                console.log("CHP/index.jsx" + err);
            })
    }, [])

    return (<>
        <EmpNavBar email={email} />
        <PageContainer>
            <div class="page-content page-container" id="page-content">
                <div class="padding">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-12">
                            <div class="card user-card-full">
                                <div class="row m-l-0 m-r-0">
                                    <div class="col-sm-4 bg-c-lite-green user-profile">
                                        <div class="card-block text-center text-white">
                                            <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/240/000000/user.png" class="img-radius" alt="User Profile" /> </div>
                                            {/* <button class="btn btn-primary" type="submit">Edit</button> */}
                                            <Link to="/EmployeeHomePage/EmpYourProfile/EditProfileEmployee"><button class="btn btn-primary" type="submit">Edit</button></Link>
                                        
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="card-block">
                                            <h1 class="m-b-20 p-b-5 b-b-default f-w-600">Personal Information</h1>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Name</p>
                                                    <h6 class="text-muted f-w-400">FirstName Last Name</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">DoB</p>
                                                    <h6 class="text-muted f-w-400">mm/dd/yyyy</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Height</p>
                                                    <h6 class="text-muted f-w-400">10'6''</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Weight</p>
                                                    <h6 class="text-muted f-w-400">??? lbs</h6>
                                                </div>
                                            </div>
                                            <h1 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Doctors</h1>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">General Practitioner</p>
                                                    <h6 class="text-muted f-w-400">Dr. FirstName LastName</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Specialist</p>
                                                    <h6 class="text-muted f-w-400">Dr. FirstName LastName</h6>
                                                </div>
                                            </div>
                                            <h1 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Medications</h1>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Medication</p>
                                                    <h6 class="text-muted f-w-400">Water</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Medication</p>
                                                    <h6 class="text-muted f-w-400">Advil</h6>
                                                </div>
                                            </div>
                                            <h1 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Insurance</h1>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Provider</p>
                                                    <h6 class="text-muted f-w-400">Company</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Policy Holder</p>
                                                    <h6 class="text-muted f-w-400">FirstName LastName</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Coverage</p>
                                                    <h6 class="text-muted f-w-400">$100 copay</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    </>
    );
}