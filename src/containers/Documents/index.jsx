import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { NavBar } from "../../components/navbar";
import './style.css';
import axios from 'axios';


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
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState({})
    const handleClose = () => {
        setShow(false);
      };

    const handleClick = (doc, e) => {
        e.preventDefault();
        setPreview(doc)
        setShow(true)
    }

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me', { withCredentials: true })
            .then((response) => {
                setEmail(response.data.full_name)
                setID(parseInt(response.data.user_id));
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
            <NavBar email={email} />
            <Fragment>
            {reports.length === 0 ? <h3 className="text-center mb-3 mt-4">No reports</h3>
            :<>
            <h3 className="text-center mb-3 mt-4">Your Reports</h3>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Date & Time</th>
                        <th>Description</th>
                        <th>Document Link</th>
                        <th>Preview</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.date_time}>
                            <td>{formatDate(report.date_time)}</td>
                            <td>{report.description}</td>
                            <td><a href = {report.link} target ="_blank" rel ="noreferer noopener noreferrer">Open in new tab</a></td>
                            <td><Button onClick = {(e) => handleClick(report, e)}>Preview</Button></td>
                        </tr>
                    ))}    
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Document Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <iframe title = {preview.description} src = {preview.link} height = "400px" style = {{margin:'0 auto', display:'block'}}/>
            </Modal.Body>
        </Modal>
            </>
            }
            
        </Fragment>
    </>
    )};
