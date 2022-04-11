import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { NavBar } from "../../components/navbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';

let user_id; 

function formatDate(date) {
 
    let year = date.substring(0,4);
    let month = date.substring(5,7);
    let day = date.substring(8,10);
    let time = date.substring(11,16);

    let formattedDate = (month + "-" + day + "-" + year + "  at  " + time)
    return (formattedDate)
}


export function Documents(props) {
    const [email, setEmail] = useState('Not logged in');
    const [reports, setReports] = useState([]);
    const [user_id, setID] = useState("");

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setEmail(response.data.full_name)
                setID(parseInt(response.data.user_id));
                console.log(user_id);
            })
            .catch((err) => {
                console.log("CHP/index.jsx" + err);
            })


        axios.get(`http://localhost:3001/documents/${user_id}`, { withCredentials: true })
            .then((response) => {
                setReports(response.data)
    
            }) 
            .catch((err) => {
                console.log(err.message)
            })
        
    }, [])


        return (<>
            <NavBar email={email} />

            <div>
                <h3 className="text-center mb-3 mt-4">Your Reports</h3>
            </div>

            <Fragment>

            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Date & Time</th>
                        <th>Description</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.user_id}>
                            <td>{formatDate(report.date_time)}</td>
                            <td>{report.description}</td>
                            <td>{report.link}</td>
                        </tr>
                    ))}    
                </tbody>
            </table>
        </Fragment>

        {/* <PageContainer>
            <div class="p-5 bg-white rounded shadow mb-5">
                <Tabs defaultActiveKey="testresults" id="uncontrolled-tab-example" className="nav nav-tabs nav-pills flex-column flex-sm-row text-center bg-light border-0 rounded-nav">
                    <Tab class="nav-item flex-sm-fill" eventKey="testresults" title="Test Results">
                        <div class="container">
                            <div class="row item-test-results">
                                <div class="col-md-4">
                                    <div class="card bg-c-blue order-card">
                                        <div class="card-block">
                                            <h1 class="m-b-20">Blood Test</h1>
                                            <p class="m-b-0">Hemoglobin:<span class="f-right">Yes</span></p>
                                            <p class="m-b-0">Liquid:<span class="f-right">Yes</span></p>
                                            <p class="m-b-0">Color:<span class="f-right">Red</span></p>
                                            <p class="m-b-0">White Blood Cells:<span class="f-right">1000</span></p>
                                            <p class="m-b-0">Type:<span class="f-right">A</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="card bg-c-green order-card">
                                        <div class="card-block">
                                            <h1 class="m-b-20">MRI</h1>
                                            <p class="m-b-0">Brain:<span class="f-right">Present</span></p>
                                            <p class="m-b-0">Hemispheres:<span class="f-right">Right and Left</span></p>
                                            <p class="m-b-0">Consistency:<span class="f-right">Squishy</span></p>
                                            <p class="m-b-0">Tumors:<span class="f-right">None</span></p>
                                            <p class="m-b-0">Texture:<span class="f-right">Smooth</span></p>
                                            <p class="m-b-0">Hotel:<span class="f-right">Trivago</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="card bg-c-yellow order-card">
                                        <div class="card-block">
                                            <h1 class="m-b-20">X-Ray</h1>
                                            <p class="m-b-0">Bones:<span class="f-right">Stable</span></p>
                                            <p class="m-b-0">Fractures:<span class="f-right">Hairline</span></p>
                                            <p class="m-b-0">Breaks:<span class="f-right">None</span></p>
                                            <p class="m-b-0">Number:<span class="f-right">206</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    
                    <Tab class="nav-item flex-sm-fill" eventKey="medicalhistory" title="Medical History">
                    <div class="container">
                            <div class="row item-test-results">
                                <div class="col-md-4">
                                    <div class="card bg-c-blue order-card">
                                        <div class="card-block">
                                            <h1 class="m-b-20">Cardiovascular</h1>
                                            <p class="m-b-0">High blood pressure:<span class="f-right">Yes</span></p>
                                            <p class="m-b-0">Chronic congestive heart failure:<span class="f-right">Yes</span></p>
                                            <p class="m-b-0">Heart attack:<span class="f-right">Yes</span></p>
                                            <p class="m-b-0">Seizures:<span class="f-right">No</span></p>
                                            <p class="m-b-0">Dizziness:<span class="f-right">Yes</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="card bg-c-green order-card">
                                        <div class="card-block">
                                            <h1 class="m-b-20">Respiratory</h1>
                                            <p class="m-b-0">Asthma:<span class="f-right">Yes</span></p>
                                            <p class="m-b-0">Bronchitis:<span class="f-right">No</span></p>
                                            <p class="m-b-0">Chronic cough:<span class="f-right">Yes</span></p>
                                            <p class="m-b-0">Shortness of Breath:<span class="f-right">Yes</span></p>
                                            <p class="m-b-0">Pneumonia:<span class="f-right">No</span></p>
                                            <p class="m-b-0">Emphysema:<span class="f-right">No</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="card bg-c-yellow order-card">
                                        <div class="card-block">
                                            <h1 class="m-b-20">Digestive</h1>
                                            <p class="m-b-0">Constipation:<span class="f-right">No</span></p>
                                            <p class="m-b-0">Chrones Disease:<span class="f-right">No</span></p>
                                            <p class="m-b-0">Irritable bowel syndrome:<span class="f-right">No</span></p>
                                            <p class="m-b-0">Inflammatory bowel disease:<span class="f-right">No</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab class="nav-item flex-sm-fill" eventKey="insurance" title="Insurance">
                    <div class="container">
                            <div class="row item-test-results">
                                <div class="col-md-4">
                                    <div class="card bg-c-blue order-card">
                                        <div class="card-block">
                                            <h1 class="m-b-20">Health Insurance Companies</h1>
                                            <p class="m-b-0">BlueCross BlueShield</p>
                                            <p class="m-b-0">Anthem</p>
                                            <p class="m-b-0">Humana</p>
                                            <p class="m-b-0">Kaiser Permanente</p>
                                            <p class="m-b-0">Cigna</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="card bg-c-green order-card">
                                        <div class="card-block">
                                            <h1 class="m-b-20">What is Covered</h1>
                                            <p class="m-b-0">Doctor and Hospital visits</p>
                                            <p class="m-b-0">Prescription Drugs</p>
                                            <p class="m-b-0">Wellness Care</p>
                                            <p class="m-b-0">Medical Devices</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="card bg-c-yellow order-card">
                                        <div class="card-block">
                                            <h1 class="m-b-20">What is not Covered</h1>
                                            <p class="m-b-0">Cosmetic procedures</p>
                                            <p class="m-b-0">Beauty treatments</p>
                                            <p class="m-b-0">Fertility treatments</p>
                                            <p class="m-b-0">Off-label prescriptions</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </PageContainer> */}
    </>
    )};
