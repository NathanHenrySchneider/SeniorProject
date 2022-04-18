
import { useEffect, useState } from "react";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default function PatientList(props){
  const [patients, setPatients] = useState([])

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios.post('http://localhost:3001/get-patients-by-docId', 
    {
      "doctor_id" : props.doctorID
    },{ 
      withCredentials: true 
    })
        .then((response) => {
            setPatients(response.data)
        })
        .catch((err) => {
            console.log(err);
        })

}, [])

  const handleClick = (e) => {

  }
    return(
    <div className=" justify-content-center" style = {{padding: '0px 3em', maxWidth: '600px', margin:'0 auto'}}>
      <div className="row d-flex justify-content-center text-center">
        <div className="card user-card-full justify-content-center">
          {(patients.length === 0) ? 
          <h3 style = {{padding:'.2em'}}>{props.doctorName} <small>(No patients yet)</small>:</h3>
          : <h3 style = {{padding:'.2em'}}>{props.doctorName}'s patient(s):</h3>
          }
          <ListGroup style = {{paddingBottom: '10px'}}>
            {patients.map((patient) => (
              <OverlayTrigger placement = "bottom" overlay = {
                <Tooltip>Click to remove {patient.full_name}</Tooltip>
              }>
                <ListGroup.Item action variant = "info" key = {patient.user_id}>{patient.full_name}</ListGroup.Item>
              </OverlayTrigger>
            ))}
            <ListGroup.Item action variant = "primary" onClick={handleClick} style = {{fontWeight: 'bold'}}>Add new patient</ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
    )
}