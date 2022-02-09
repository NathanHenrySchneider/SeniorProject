import React from "react";
import { useState, useEffect } from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { EmpNavBar } from "../../components/Empnavbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';

export function EmpDocuments(props) {
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
                        <div role="tabpanel" aria-labelledby="medicalhistory-tab" class="tab-pane px-4 py-5">
                            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </Tab>
                    <Tab class="nav-item flex-sm-fill" eventKey="insurance" title="Insurance">
                        <div role="tabpanel" aria-labelledby="insurance-tab" class="tab-pane px-4 py-5">
                            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </PageContainer>
    </>
    );
}