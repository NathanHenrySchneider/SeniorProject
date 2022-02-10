import React from "react";
import { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Container } from "react-bootstrap";
import ComposeEmail from "./ComposeEmail";

export function Chat(props){

	const [email, setEmail] = useState('Not logged in');
	useEffect(() => {
		axios.defaults.withCredentials = true;

		axios.post('http://localhost:3001/me', { withCredentials: true })
			.then((response) => {
				console.log("This is response:", response.data)
				setEmail(response.data.email)
			})
			.catch((err) => {
				console.log("CHP/index.jsx" + err);
			})
	}, [])

    return (<>
        <NavBar email={email} />
        <><h1 className="text-center mb-3 mt-4">Message Portal</h1><>
            <div className="text-center">
                <Button variant="primary w-25">Refresh</Button>{' '}
                <ComposeEmail></ComposeEmail>
            </div>
        </></>
        <Container fluid="md">
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th className="text-center">  Open  </th>
                        <th className="text-center"> Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>11/15/21</td>
                        <td>Dr.Snow</td>
                        <td>Consulation</td>
                        <td colSpan={1.5} className="text-center">
                            <Button variant="primary btn-center">Open</Button>
                        </td>
                        <td colSpan={1.5} className="text-center">
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>12/11/21</td>
                        <td>Dr.Potter</td>
                        <td>Primary Doctor Visit</td>
                        <td colSpan={1} className="text-center">
                        <Button variant="primary">Open</Button>
                        </td>
                        <td colSpan={1} className="text-center">
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>12/27/21</td>
                        <td>Nurse Jenkins</td>
                        <td>Physical</td>
                        <td colSpan={1} className="text-center">
                        <Button variant="primary">Open</Button>
                        </td>
                        <td colSpan={1} className="text-center">
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>1/5/22</td>
                        <td>Nurse Johnson</td>
                        <td>Physical</td>
                        <td colSpan={1} className="text-center">
                        <Button variant="primary">Open</Button>
                        </td>
                        <td colSpan={1} className="text-center">
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>1/20/22</td>
                        <td>Dr.Kendrick</td>
                        <td>Knee Surgery Consultation</td>
                        <td colSpan={1} className="text-center">
                        <Button variant="primary">Open</Button>
                        </td>
                        <td colSpan={1} className="text-center">
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
        </>
        
        
    );
}