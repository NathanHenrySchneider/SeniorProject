import React, {Fragment } from "react";
import { useState, useEffect } from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { EmpNavBar } from "../../components/Empnavbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';
import { ButtonGroup, ButtonToolbar, Form, Row, Col,  Button, Modal } from "react-bootstrap";

function formatDate(date) {
 
    let year = date.substring(0,4);
    let month = date.substring(5,7);
    let day = date.substring(8,10);
    let time = date.substring(11,16);

    let formattedDate = (month + "-" + day + "-" + year + "  at  " + time)
    return (formattedDate)
}

export function EmpDocuments(props) {
    const [email, setEmail] = useState('Not logged in');
    const [reports, setReports] = useState([]);
    const [user_id, setID] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

        axios.get(`http://localhost:3001/documents/${user_id}`, { withCredentials: true })
            .then((response) => {
                setReports(response.data)
    
            }) 
            .catch((err) => {
                console.log(err.message)
            })

    }, [])

    return (<>
        <EmpNavBar email={email} />

        <div>
            <h1 className="text-center mb-3 mt-4">Document Portal</h1>
        </div>

        <div>
            <h3 className="text-center mb-3 mt-4">Upload Files</h3>
        </div>

        <div className="mx-5 px-5">

            <Form className="ml-4">
                <Form.Group as={Row} className="mb-3" controlId="selectPatient">
                    <Form.Label column sm={2}>
                        Select Patient: 
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select aria-label="Default select example">
                            <option>Current Patients</option>
                            <option value="1">John Doe</option>
                        </Form.Select>  
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="selectFile">
                    <Form.Label column sm={2}>
                        Select File: 
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="file" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="createDescription">
                    <Form.Label column sm={2}>
                        Enter Description 
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" />
                    </Col>
                </Form.Group>

                <Button type="submit" variant="success">Submit</Button>{' '}
            </Form>

        <div>
            <h3 className="text-center mb-3 mt-4">View Reports for Patient</h3>
        </div>

        <Form.Group as={Row} className="mb-3" controlId="selectPatient">
            <Form.Label column sm={2}>
                Select Patient: 
            </Form.Label>
            <Col sm={10}>
                <Form.Select aria-label="Default select example">
                    <option>Current Patients</option>
                    <option value="1">John Doe</option>
                </Form.Select>  
            </Col>
        </Form.Group>

        <Button variant="success" onClick={handleShow}>Search</Button>

        <Modal 
        show={show} 
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
                
        <Modal.Header closeButton>
          <Modal.Title>Patient Reports for John Doe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>





        </div>



        





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
        </PageContainer> */}
     </>
    );
}