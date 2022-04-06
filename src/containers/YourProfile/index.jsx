import React from "react";
import { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';
import { Link} from "react-router-dom";


export function YourProfile(props) {
    const [email, setEmail] = useState('Not logged in');
    const [fullName, setFullName] = useState();
    const [dob, setDoB] = useState();
    const [height, setHeight] = useState(); 
    const [weight, setWeight] = useState(); 
    const [doc, setDoc] = useState(); 
    const [meds, setMeds] = useState(); 
    const [allergy, setAllergy] = useState();
    const [insurance, setIns] = useState(); 
    const [groupNo, setGroupNo] = useState(); 
    const [policyHolder, setPolicyHolder] = useState(); 
    

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setEmail(response.data.email)
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
    

            })
            .catch((err) => {
                console.log("CHP/index.jsx" + err);
            })
    }, [])

    return (<>
        <NavBar email={fullName + "   :    " + email} />
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
                                            {/* <Link to="/customerhomepage/yourprofile/editprofile"></Link> */}
                                            <Link to="/customerhomepage/yourprofile/editprofile"><button class="btn btn-primary" type="submit">Edit</button></Link>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="card-block">
                                            <h1 class="m-b-20 p-b-5 b-b-default f-w-600">Personal Information</h1>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Name</p>
                                                    <h6 class="text-muted f-w-400">{fullName}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">DoB</p>
                                                    <h6 class="text-muted f-w-400">{dob}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Height</p>
                                                    <h6 class="text-muted f-w-400">{height}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Weight</p>
                                                    <h6 class="text-muted f-w-400">{weight}</h6>
                                                </div>
                                            </div>
                                            <h1 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Doctors</h1>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Preferred Provider</p>
                                                    <h6 class="text-muted f-w-400">{doc}</h6>
                                                </div>
                                                {/* <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Specialist</p>
                                                    <h6 class="text-muted f-w-400">Dr. FirstName LastName</h6>
                                                </div> */}
                                            </div>
                                            <h1 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Medications</h1>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Medication</p>
                                                    <h6 class="text-muted f-w-400">{meds}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Allergies</p>
                                                    <h6 class="text-muted f-w-400">{allergy}</h6>
                                                </div>
                                            </div>
                                            <h1 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Insurance</h1>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Provider</p>
                                                    <h6 class="text-muted f-w-400">{insurance}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Policy Holder</p>
                                                    <h6 class="text-muted f-w-400">{policyHolder}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Group ID</p>
                                                    <h6 class="text-muted f-w-400">{groupNo}</h6>
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