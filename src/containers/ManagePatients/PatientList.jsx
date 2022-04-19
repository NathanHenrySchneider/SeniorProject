
import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'


export default function PatientList(props){
  const [patients, setPatients] = useState([])
  const [userList, setUserList] = useState([])
  const [show, setShow] = useState(false);
  const[toRemove, setToRemove] = useState();
  const[removeFrom, setRemoveFrom] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const [doctorId, setDoctorId] = useState();
  let index = -1;
  console.log(props)
  const handleClose = () => {
    setShow(false)
  }
  const handleCloseDelete = () => {
    setShowDelete(false)
  }
  useEffect(()=>{
    axios.defaults.withCredentials = true;

    axios
    .get("http://localhost:3001/all-users")
    .then((response) =>{
        let arr = [];
        console.log(response.data)
        response.data.forEach((element) => {
            if(element.user_type === "patient" && element.assigned_doctor_id === null){
                arr.push({
                  "full_name": element.full_name,
                  "user_id" : element.user_id
                })
            }
        })
        setUserList(arr);
        console.log(userList)
    })
}, [])
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

  const handleRemove = (e) => {
    console.log("TO REMOVE " + e.target.id + " FROM DOCTOR " + e.target.className.split(" ")[0])
    setToRemove(e.target.id)
    setRemoveFrom(e.target.className.split(" ")[0])
    setShowDelete(true)
  }

  const handleClickAddNew = (e) => {
    // console.log(e.target.id)
    setDoctorId(e.target.id)
    setShow(true)
  }
  const handleClickListItem = (e) => {
    let targetIndex;
    if (e.target.id === "") targetIndex = e.target.parentElement.id;
    if (parseInt(e.target.id) > 19) targetIndex = e.target.parentElement.parentElement.id;
    else targetIndex = e.target.id;
    console.log('user to add ------>' + userList[targetIndex].user_id)
    console.log('doctor ====>' + doctorId)
    let user = parseInt(userList[targetIndex].user_id)
    console.log(typeof(doctorId))
    axios.post('http://localhost:3001/add-patient', 
    {
      "doctor_id" : parseInt(doctorId),
      "user_to_add" : user
    },{ 
      withCredentials: true 
    })
        .then((response) => {
            setPatients(response.data)
        })
        .catch((err) => {
            console.log(err);
        })

  }
  const confirmDelete = () =>{

  }
    return(<>
    <div className=" justify-content-center" style = {{padding: '0px 3em', maxWidth: '600px', margin:'0 auto'}}>
      <div className="row d-flex justify-content-center text-center">
        <div className="card user-card-full justify-content-center">
          {(patients.length === 0) ? 
          <h3 style = {{padding:'.2em'}}>{props.doctorName} <small>(No patients yet)</small>:</h3>
          : <h3 style = {{padding:'.2em'}}>{props.doctorName}'s patient(s):</h3>
          }
          <ListGroup style = {{paddingBottom: '10px'}}>
            {patients.map((patient) => (
              <OverlayTrigger key = {patient.user_id} placement = "bottom" overlay = {
                <Tooltip key = {patient.user_id}>Click to remove {patient.full_name}</Tooltip>
              }>
                <ListGroup.Item action onClick = {handleRemove} id = {patient.user_id} className = {props.doctorID} variant = "info" key = {patient.user_id}>{patient.full_name}</ListGroup.Item>
              </OverlayTrigger>
            ))}
            <ListGroup.Item id = {props.doctorID} action variant = "primary" onClick={handleClickAddNew} style = {{fontWeight: 'bold'}}>Add new patient</ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
    <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete user #{toRemove} from the doctor #{removeFrom}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick = {() => setShowDelete(false)}>Close</Button>
              <Button variant="primary" onClick = {confirmDelete}>Confirm Delete</Button>
          </Modal.Footer>
    </Modal>

    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Click to add a patient for doctor #{doctorId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup as="ol" numbered>
                {userList.map((user) => {
                    index++;
                    return(
                    <ListGroup.Item
                        key = {index}
                        id = {index}
                        action
                        as="li"
                        onClick = {(e)=>handleClickListItem(e)}
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold" id = {user.user_id}>{user.full_name}</div>
                        {user.email}
                        </div>
                    </ListGroup.Item>
                    )
                })}

            </ListGroup>
            </Modal.Body>
        </Modal>
    </>)
}