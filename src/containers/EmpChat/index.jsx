import React from "react";
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Collapse from 'react-bootstrap/Collapse'
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import { Modal } from 'react-bootstrap'
import axios from 'axios';
import { useState, useEffect } from "react";
import { EmpNavBar } from "../../components/Empnavbar";
import { io } from "socket.io-client";
import ScrollableFeed from 'react-scrollable-feed'

let messageArr = [];
let set = new Set();
let activeUsers = [];
let user;
let index = 0;
let socket = io("ws://localhost:4000", { transports : ['websocket'] });

export function EmpChat(props){
    const[first, setFirst] = useState();
    const [fetched, setFetched] = useState(false);
    const [email, setEmail] = useState("Not logged in");
    const [userID, setUserID] = useState(-1);
    const [allMessages, setAllMessages] = useState([])
    const [userList, setUserList] = useState([])
    const [show, setShow] = useState(false);
    const[composeTo, setComposeTo] = useState();
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState();
    const [open, setOpen] = useState(false);

    socket.on("new", (arg) => {
        setFetched(true);
        setFetched(false)
    })

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
        axios
            .get("http://localhost:3001/messaging")
            .then((response) =>{
                messageArr = response.data.filter((item) => {
                    return item.recipient_id === userID || item.sender_id === userID
                })

            }).then(() => {
                messageArr.forEach((item) => {
                    if(!set.has(item.sender_id) && item.sender_id !== userID){
                        activeUsers.push([item.sender_name, item.sender_id])
                        set.add(item.sender_id)
                    }
                    if(!set.has(item.recipient_id) && item.recipient_id !== userID){
                        activeUsers.push([item.sender_name, item.sender_id])
                        set.add(item.recipient_id)
                    }
                })
                setFirst(activeUsers[0][1])
                setTimeout(() => {
                    document.querySelector(".col-sm-9").childNodes.forEach((element) => {
                        if(element.classList.contains("active")) element.style.display = "block"
                        else{element.style.display = "none"}
                    })
                }, 100)
                setAllMessages(messageArr)
                
                setLoading(false)
                setFetched(true)
              
            })
            .catch((err) => console.log(err))
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
                    index = index + 1;
                })
                setUserList(arr);
            })
    }, [userID, fetched]);
    
    const selectHandler = (e) => {
        setTimeout(() => {
            document.querySelector(".col-sm-9").childNodes.forEach((element) => {
                if(element.classList.contains("active")) element.style.display = "block"
                else{element.style.display = "none"}
            })
        }, 100)
    }

    const handleClick = (e) => {
        if (e.target.id === "") console.log(e.target.parentElement.id)
        else console.log(e.target.id)
        // setComposeTo(userList[])
        console.log(userList)
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
      };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setFetched(false);
        console.log(fullName)
        axios
        .post("http://localhost:3001/messaging", 
        { 
            sender_id: userID,
            recipient_id: e.target.parentElement.id,
            message: e.target[0].value,
            sender_name: fullName
         }).then(e.target[0].value = "")
         .catch(err => console.log(err))
        
    }
    if(loading) return <h1>loading</h1>
    return (
        <>
        <EmpNavBar email={email} />
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
                    return(
                    <ListGroup.Item
                        key = {user.user_id}
                        id = {user.user_id}
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
        <Tab.Container id="left-tabs-example" defaultActiveKey={first}>
            <Row style = {{maxWidth:'700px', margin:'0 auto'}}>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                    {activeUsers.map((id) => {
                        (id[0] === null) ? user = 'User #' + id[1] : user = id[0]
                        return(
                            <Nav.Item>
                                <Nav.Link onClick = {(e)=>selectHandler(e)} eventKey={id[1]}>{user}</Nav.Link>
                            </Nav.Item>
                        )         
                        })}
                    </Nav>
                </Col>
                <Col sm={9}>
                {activeUsers.map((id) => {
                    (id[0] === null) ? user = 'User #' + id[1] : user = id[0]
                    return(
                        <Tab.Pane eventKey={id[1]}>
                        <Card key = {id[1]} id = {id[1]} className = "message-box">
                            <h3 style = {{'textAlign' : 'center'}}>{user}</h3>
                            <div className = "message-containter">
                            <ScrollableFeed> 
                            {allMessages.map((item) => {
                                if(item.sender_id === id[1] && item.recipient_id === userID) {
                                    return (
                                    <div style = {{'display':'contents'}} key = {"d" + item.date_time}>
                                        <p key = {"p" + item.date_time} className = "left-bubble">{item.message}</p>
                                        <small key = {item.date_time}>{item.date_time.split("T")[0]+" " + item.date_time.split("T")[1].substring(0,5)}</small>
                                    </div>)
                                }
                                if(item.sender_id === userID && item.recipient_id === id[1]) {
                                    return (
                                    <div style = {{'display':'contents'}} key = {"d" + item.date_time}>
                                        <p key = { "p" + item.date_time} className = "right-bubble">{item.message}</p>
                                        <small key = {item.date_time} className = "right">{item.date_time.split("T")[0]+" " + item.date_time.split("T")[1].substring(0,5)}
                                        </small>
                                    </div>)
                                }
                                return null;
                            })}
                            </ScrollableFeed>
                            </div>
                            <form onSubmit = {(e) => handleSubmit(e)}>
                            <InputGroup style = {{'bottom': '-17px', 'position':'absolute'}} className="mb-3">
                                <FormControl
                                placeholder={'Reply to ' + user}
                                />
                                <Button type = "submit" variant="outline-secondary" id="button-addon2">
                                Send
                                </Button>
                            </InputGroup>
                            </form>
                        </Card>
                        </Tab.Pane>)
                    })
                }
                </Col>
            </Row>
        </Tab.Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/* <FormContainer
              onSubmit={(e) => {
                handleModalSubmit(e);
                handleClose();
              }}
          <Button type="submit" style={{ width: "fit-content" }}>
                  Schedule
                </Button>
              )}
            </FormContainer> */}
          </Modal.Body>
        </Modal>
        </>
    )
}

