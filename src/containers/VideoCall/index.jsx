import React from "react";
import { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import zoomIcon from "../../images/zoom_logo.png";
// import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
// import { useState, useEffect } from "react";
// import { NavBar } from "../../components/navbar";
import { io } from "socket.io-client";
import ScrollableFeed from 'react-scrollable-feed'
import Collapse from 'react-bootstrap/Collapse'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

let index;
let messageArr = [];
let set = new Set();
let activeUsers = [];
let nameMap = new Map();

export function VideoCall(props) {
    const [email, setEmail] = useState('Not logged in');
    const [userList, setUserList] = useState([])
    const [show, setShow] = useState(false);
    const[composeTo, setComposeTo] = useState('');
    const [open, setOpen] = useState(false);
    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/me', { withCredentials: true })
            .then((response) => {
                console.log(response.data)
                setEmail(response.data.full_name)
            })
            .catch((err) => {
                console.log("CHP/index.jsx" + err);
            })
        
        // Doctors list
        axios
            .get("http://localhost:3001/all-users")
            .then((response) =>{
                let arr = [];
                response.data.forEach((element) => {
                    console.log(element)
                    if(!set.has(element.user_id) && (element.user_type === 'doctor')){
                        arr.push({
                            user_id : element.user_id,
                            full_name: element.full_name,
                            email: element.email,
                            user_type: element.user_type
                        })
                    }
                })
                setUserList(arr);
                console.log("DOCTORS");
                
                console.log(arr)
        })

    }, [composeTo])

    const handleClick = (e) => {
        let targetIndex;
        if (e.target.id === "") targetIndex = e.target.parentElement.id;
        else targetIndex = e.target.id;
        console.log("targetindex" + targetIndex)
        setComposeTo(userList[targetIndex].full_name)
        // console.log('---' + userList[targetIndex].full_name)
        setTimeout(()=>{
            setShow(true);
        },100)
    }

    index = -1
    // if(composeTo !== undefined) return (<h1>Loading...</h1>)

    return (<>
        <NavBar email={email} />
        <PageContainer>
            <div class="card-block text-center">
                <div class="m-b-25"> <img src={zoomIcon} alt="zoom icon" class="img-radius" /> </div>
                <div>
                    <p class="m-b-10 f-w-600">Doctor</p>
                    <h6 class="text-muted f-w-400">{composeTo}</h6>
                    <Button 
            onClick={() => setOpen(!open)}
            aria-controls="collapse"
            aria-expanded={open}
            style = {{margin:'0 auto', display:'block'}}>
            {(open) ? 'Collapse List' : 'Select Your Doctor' }</Button>
            <br/>
            {(open) ? <small style = {{margin: '-15px auto 8px auto', fontSize: 'large', display:'block', width:'fit-content'}}>
                Select a user to start a conversation:</small> : <></>}
        <Collapse in={open}>
            <div id="collapse">
            <ListGroup as="ol" numbered>
                {userList.map((user) => {
                    index++;
                    return(
                    <ListGroup.Item
                        key = {index}
                        id = {index}
                        action
                        as="li"
                        onClick = {(e)=>handleClick(e)}
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                        <div className="fw-bold" id = {user.user_id}>{user.full_name}</div>
                        {user.email}
                        </div>
                        <Badge bg="primary" pill>
                        {user.user_type} #{user.user_id}
                        </Badge>
                    </ListGroup.Item>
                    )
                })}

            </ListGroup>
            </div>
        </Collapse>
                </div>
                <div>
                    <p class="m-b-10 f-w-600">Time</p>
                    <h6 class="text-muted f-w-400">12:00 PM</h6>
                </div>
                <div>
                    <p class="m-b-10 f-w-600">Date</p>
                    <h6 class="text-muted f-w-400">mm/dd/yyyy</h6>
                </div>
                {/* <button class="btn btn-primary" type="submit">Launch Meeting</button> */}
                <a id="Join meeting" href="https://us04web.zoom.us/j/77685262436?pwd=I0qcN5jBMhT-sdQT0d9nVVS5kYbOwu.1">Join Call</a>
            </div>
        </PageContainer>
    </>
    );
            }