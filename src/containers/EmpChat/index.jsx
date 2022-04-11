
   
import React from "react";
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useState, useEffect } from "react";
import { EmpNavBar } from "../../components/Empnavbar";
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

export function EmpChat(props){

    const [fetched, setFetched] = useState(false);
    const [email, setEmail] = useState("Not logged in");
    const [userID, setUserID] = useState(-1);
    const [allMessages, setAllMessages] = useState([])
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState();
    const [mapDone, setMapDone] = useState(false);
    const [userList, setUserList] = useState([])
    const [show, setShow] = useState(false);
    const[composeTo, setComposeTo] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        socket.once("new", (arg) => {
            socket.off()
            console.log(arg)
            setFetched(false)
            return false;
        })
    },[fetched])
   
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios
        .get("http://localhost:3001/all-users")
        .then((response) =>{
            let arr = [];
            response.data.forEach((element) => {
                if(!set.has(element.user_id)){
                    arr.push({
                        user_id : element.user_id,
                        full_name: element.full_name,
                        email: element.email,
                        user_type: element.user_type
                    })
                }
            })
            setUserList(arr);
            console.log(userList)
        })
    }, [])
    useEffect(() => {
        axios.defaults.withCredentials = true;

        axios
        .post("http://localhost:3001/me", { withCredentials: true })
        .then((response) => {
            setEmail(response.data.email);
            setUserID(response.data.user_id);
            setFullName(response.data.full_name);
        }).catch((err) => {
            console.log("CHP/index.jsx" + err);
        });
    }, [userID])
    useEffect(() => {
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
            
    }, [fetched, userID, mapDone]);

    const handleClick = (e) => {
        let targetIndex;
        if (e.target.id === "") targetIndex = e.target.parentElement.id;
        else targetIndex = e.target.id;
        setComposeTo(targetIndex)
        // console.log('---' + userList[targetIndex].full_name)
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
            recipient_id: userList[composeTo].user_id,
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
        <EmpNavBar email={fullName} />
        <h1 className="text-center mb-3 mt-4">{fullName}'s Message Portal</h1>
        <Button 
            onClick={() => setOpen(!open)}
            aria-controls="collapse"
            aria-expanded={open}
            style = {{margin:'0 auto', display:'block'}}>
            {(open) ? 'Collapse List' : 'Compose new message' }</Button>
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
        <hr style = {{width:'500px', margin:'0 auto'}}/>
        <br/>
        {(activeUsers.length === 0) ? <h2 style = {{textAlign: 'center'}}>Click above to start a conversation!</h2>
        : 
        <small style = {{margin: '-15px auto 8px auto', fontSize: 'large', display:'block', width:'fit-content'}}>Open conversations:</small>
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
                {(userList[composeTo] !== undefined) ? <h3>Say Hi to {userList[composeTo].full_name}</h3> : <></>}
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