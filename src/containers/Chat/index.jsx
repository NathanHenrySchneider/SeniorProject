
   
import React from "react";
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
import { io } from "socket.io-client";
import ScrollableFeed from 'react-scrollable-feed'
import Collapse from 'react-bootstrap/Collapse'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

let index
let messageArr = [];
let set = new Set();
let activeUsers = [];
let nameMap = new Map();

let socket = io("ws://localhost:4000", { transports : ['websocket'] });

export function Chat(props){

    const [fetched, setFetched] = useState(false);
    const [email, setEmail] = useState("Not logged in");
    const [userID, setUserID] = useState(-1);
    const [allMessages, setAllMessages] = useState([])
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState();
    const [mapDone, setMapDone] = useState(false);
    const [userList, setUserList] = useState([])
    const [assignedDocId, setAssignedDocId] = useState()
    const [assignedDocName, setAssignedDocName] = useState()
    const [show, setShow] = useState(false);
    const[composeTo, setComposeTo] = useState();
    const [open, setOpen] = useState(false);
    // Uncomment to implement assigned doctor
    // const [assignedDocId, setAssignedDocId] = useState();

    useEffect(() => {
        socket.once("new", (arg) => {
            socket.off()
            console.log(arg)
            setFetched(false)
            return false;
        })
    }, [fetched])


    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios
        .post("http://localhost:3001/me", { withCredentials: true })
        .then((response) => {
            setEmail(response.data.email);
            setUserID(response.data.user_id);
            setFullName(response.data.full_name);
            setAssignedDocId(response.data.assigned_doctor_id);
        }).catch((err) => {
            console.log("CHP/index.jsx" + err);
        });
        if(assignedDocId){
            axios.get(`http://localhost:3001/user/find/${assignedDocId}`, { withCredentials: true })
            .then((response) => {
                setAssignedDocName(response.data[0].full_name)
            }).catch((err) => {
                console.log("CHP/index.jsx" + err);
            });
        }
    
    }, [userID, assignedDocId])
    useEffect(()=>{
        axios
            .get("http://localhost:3001/messaging")
            .then((response) =>{
                messageArr = response.data.filter((item) => {
                    return item.recipient_id === userID || item.sender_id === userID
                })

            }).then(() => {
                messageArr.forEach((item) => {
                    if(!set.has(item.sender_id) && item.sender_id !== userID){
                        activeUsers.push(item.sender_id)
                        set.add(item.sender_id)
                    }
                    if(!set.has(item.recipient_id) && item.recipient_id !== userID){
                        activeUsers.push(item.recipient_id)
                        set.add(item.recipient_id)
                    }
                })
                setAllMessages(messageArr)
                activeUsers.forEach((id) => {
                    axios
                    .get(`http://localhost:3001/user/find/${id}`, { withCredentials: true },
                    { }).then((response) => {
                        nameMap.set(id, response.data[0].full_name)
                        if(nameMap.size === activeUsers.length) setMapDone(true)
                    }).catch(err => console.log(err))
                })
            })
            .catch((err) => console.log(err))
                setLoading(false)
                setFetched(true)
            
    }, [userID, fetched, mapDone]);

    useEffect(() => {
        document.title = "Chat";  
      }, []);

    const handleClick = (e) => {
        let targetIndex;
        if (e.target.id === "") targetIndex = e.target.parentElement.id;
        else targetIndex = e.target.id;
        setComposeTo(targetIndex)
        setTimeout(()=>{
            setShow(true);
        },100)
    }
    const handleClose = () => {
        setShow(false);
      };

    const handleModalSubmit = (e) =>{
        e.preventDefault();
       axios
        .post("http://localhost:3001/messaging", 
        { 
            sender_id: userID,
            recipient_id: assignedDocId,
            message: e.target[0].value
         }).then(e.target[0].value = "").then(setShow(false))
         .catch(err => console.log(err))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFetched(false);
        axios
        .post("http://localhost:3001/messaging", 
        { 
            sender_id: userID,
            recipient_id: e.target.parentElement.id,
            message: e.target[0].value
         }).then(e.target[0].value = "")
         .catch(err => console.log(err))
    }
    if(loading && !mapDone) return <h1>loading</h1>
    index = -1
    return (
        <>
        <NavBar email={fullName} />
        <h1 className="text-center mb-3 mt-4">{fullName}'s Message Portal</h1>

        <hr style = {{width:'500px', margin:'0 auto'}}/>
        <br/>
        
        {(activeUsers.length === 0 ) 
            ? 
            <> 
            {(!assignedDocId) 
                ? <h2 style = {{textAlign: 'center'}}>Doctor not assigned. Please contact us.</h2>
                : <> 
                <h2 style = {{textAlign: 'center'}}>
                Say Hi to {assignedDocName}! 
                </h2>
                <Button onClick={handleClick} style = {{margin:'0 auto', display:'block'}}>Compose new message</Button>

                </>
            }
            </>
            : 
            <small style = {{margin: '-15px auto 8px auto', fontSize: 'large', display:'block', width:'fit-content'}}>
            Open conversation:
            </small> 
        }
        
        {activeUsers.map((id) => (
            <Card key = {id} id = {id} className = "message-box">
            <h3 style = {{'textAlign' : 'center'}}>{nameMap.get(id)}</h3>
            <div className = "message-containter">
                <ScrollableFeed>
                    
                {allMessages.map((item) => {
                    if(item.sender_id === id && item.recipient_id === userID) {
                        return (<div style = {{'display':'contents'}} key = {"d" + item.date_time}><p key = {"p" + item.date_time} className = "left-bubble">{item.message}</p>
                        <small key = {item.date_time}>{item.date_time.split("T")[0]+" " + item.date_time.split("T")[1].substring(0,5)}</small></div>)
                    }
                    if(item.sender_id === userID && item.recipient_id === id) {
                        return (<div style = {{'display':'contents'}} key = {"d" + item.date_time}><p key = { "p" + item.date_time} className = "right-bubble">{item.message}</p>
                        <small key = {item.date_time} className = "right">{item.date_time.split("T")[0]+" " + item.date_time.split("T")[1].substring(0,5)}</small></div>)
                    }
                    return null;
                })}
            </ScrollableFeed>
            </div>
            <form onSubmit = {(e) => handleSubmit(e)}>
            <InputGroup style = {{'bottom': '-17px', 'position':'absolute'}} className="mb-3">
                <FormControl
                placeholder={"Reply to " + nameMap.get(id)}
                />
                <Button type = "submit" variant="outline-secondary" id="button-addon2">
                Send
                </Button>
            </InputGroup>
            </form>
        </Card>
        ))}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(assignedDocName !== undefined) ? <h3>Say Hi to {assignedDocName}</h3> : <></>}
                 <form onSubmit = {(e) => handleModalSubmit(e)}>
                <InputGroup style = {{'bottom': '-17px'}} className="mb-3">
                    <FormControl
                    placeholder="Type your message.."
                    />
                    <Button type = "submit" variant="outline-secondary" id="button-addon2">
                    Send
                    </Button>
                </InputGroup>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
}