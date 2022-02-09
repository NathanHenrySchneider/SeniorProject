import React from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export function Chat(props){
    return (
        <><><h1 className="text-center mb-3 mt-4">Message Portal</h1><>
            <div className="text-center">
                <Button variant="primary w-25">Refresh</Button>{' '}
                <Button variant="secondary w-25 mx-3">Compose</Button>{' '}
            </div>
        </></><Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Date/Time</th>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Read</th>
                        <th>Delete</th>
                    </tr>
                </thead>
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