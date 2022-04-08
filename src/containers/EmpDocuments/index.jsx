import React, {Fragment } from "react";
import { useState, useEffect } from "react";
import { EmpNavBar } from "../../components/Empnavbar";
import './style.css';
import axios from 'axios';
import { Form, Row, Col, FormControl, Button, Modal, Alert } from "react-bootstrap";
import { PickerInline } from 'filestack-react';


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
    const [description, setDescription] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const [filesUploaded, setFilesUploaded]  = useState([]);
    const [show, setShow] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseSuccess = () => {
        setShowSuccess(false);
        setUploaded(false)
    }


    //submits for user 22 currently. (patient@patient)
    const handleSubmit = (e) => {
        e.preventDefault();
        filesUploaded.forEach((link) => {
            axios
            .post("http://localhost:3001/documents", 
            { 
                user_id: 22,
                description: description,
                link: link.url
            }).then(res => console.log(res))
            .catch(err => console.log(err))
            })
        setDescription("")
        setShowSuccess(true)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }


        
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

    }, [user_id])

    return (<>
        <EmpNavBar email={email} />
            <h1 className="text-center mb-3 mt-4">Document Portal</h1>
            <Modal 
                show={showSuccess} 
                onHide={handleCloseSuccess}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                >
                        
                <Modal.Header closeButton>
                <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Document(s) uploaded to the database.
                </Modal.Body>
            </Modal>

            <h3 className="text-center mb-3 mt-4">Upload Files</h3>

        <div className="mx-5 px-5">

            <Form className="ml-4" onSubmit = {(e) => handleSubmit(e)}>
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
                <Form.Label column sm={2}>
                        Upload File(s):
                    </Form.Label>
                <Alert variant="info" show = {uploaded}>
                    <h5>File(s) uploaded. Don't forget to submit!</h5>
                </Alert>
                <PickerInline
                    apikey="ADRLkeKpRRGZuFOBdJR0Hz"
                    onSuccess={(res) => console.log(res)}
                    onUploadDone={(res) => {
                        setUploaded(true)
                        setFilesUploaded(res.filesUploaded)
                    }}
                ></PickerInline>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="createDescription">
                    <Form.Label column sm={2}>
                        Enter Description 
                    </Form.Label>
                    <Col sm={10}>
                    <FormControl value = {description} onChange = {(e) => handleDescriptionChange(e)} type="text" />
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
        </>
    );
}