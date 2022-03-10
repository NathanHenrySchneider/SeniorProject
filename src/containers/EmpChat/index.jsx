import React from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useState, useEffect } from "react";

let messageArr = [];
let map = {};

export function EmpChat(props){
    const [email, setEmail] = useState("Not logged in");
    const [userID, setUserID] = useState(-1);

    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios
        .post("http://localhost:3001/me", { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setEmail(response.data.email);
            setUserID(response.data.user_id);
        })
        .then(
            axios
            .get("http://localhost:3001/messaging")
            .then((response) =>{
                messageArr = response.data.filter((item) => {
                    return item.recipient_id === userID
                })
            }).then(() =>{
                console.log(messageArr)
                console.log('prints messages recieved by logged in user')
                if(messageArr.length > 0){
                    messageArr.forEach((item) => {
                        map[item.sender_id] = map[item.sender_id] || [];
                        // Adds a value to the end of the Array
                        map[item.sender_id].push(item);
                    })
                }
                console.log("sorted by sender_id")
                console.log(map);
            })
            .catch((err) => console.log(err))
        )
        .catch((err) => {
            console.log("CHP/index.jsx" + err);
        });
    }, [userID]);

    
    return (
        <><><h1 className="text-center mb-3 mt-4">{email}'s Message Portal</h1><>
            <div className="text-center">
                <Button variant="primary w-25">Refresh</Button>{' '}
                <Button variant="secondary w-25 mx-3">Compose</Button>{' '}
            </div>
        </></><Table striped bordered hover className="mt-4">
                {/* <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Message</th>
                        <th>Subject</th>
                        <th>Read</th>
                        <th>Delete</th>
                    </tr>
                </thead> */}
                <tbody>
                    <tr>
                        <td>11/15/21</td>
                        <td>Dr.Snow</td>
                        <td>Consulation</td>
                        <td colSpan={1}>
                            <Button variant="primary">Read</Button>
                        </td>
                        <td colSpan={1}>
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>12/11/21</td>
                        <td>Dr.Potter</td>
                        <td>Primary Doctor Visit</td>
                        <td colSpan={1}>
                        <Button variant="primary">Read</Button>
                        </td>
                        <td colSpan={1}>
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>12/27/21</td>
                        <td>Nurse Jenkins</td>
                        <td>Physical</td>
                        <td colSpan={1}>
                        <Button variant="primary">Read</Button>
                        </td>
                        <td colSpan={1}>
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>1/5/22</td>
                        <td>Nurse Johnson</td>
                        <td>Physical</td>
                        <td colSpan={1}>
                        <Button variant="primary">Read</Button>
                        </td>
                        <td colSpan={1}>
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>1/20/22</td>
                        <td>Dr.Kendrick</td>
                        <td>Knee Surgery Consultation</td>
                        <td colSpan={1}>
                        <Button variant="primary">Read</Button>
                        </td>
                        <td colSpan={1}>
                        <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table></>
        
    );
}