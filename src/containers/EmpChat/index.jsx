import React from "react";
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";


let messageArr = [];
let set = new Set();
let activeUsers = [];

export function EmpChat(props){
    const [email, setEmail] = useState("Not logged in");
    const [userID, setUserID] = useState(-1);
    const [allMessages, setAllMessages] = useState([])
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState();

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
                        activeUsers.push(item.sender_id)
                        set.add(item.sender_id)
                    }
                    if(!set.has(item.recipient_id) && item.recipient_id !== userID){
                        activeUsers.push(item.recipient_id)
                        set.add(item.recipient_id)
                    }
                })
                setAllMessages(messageArr)
                setLoading(false)
            })
            .catch((err) => console.log(err))
        
    }, [userID]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        window.alert('dd')
    }
    if(loading) return <h1>loading</h1>
    return (
        <>
        <NavBar email={email} />
        <h1 className="text-center mb-3 mt-4">{fullName}'s Message Portal</h1>
        {activeUsers.map((id) => (
            <Card className = "message-box">
            <h3 style = {{'textAlign' : 'center'}}>User #{id}</h3>
            <div className = "message-containter">
                {allMessages.map((item) => {
                    if(item.sender_id === id && item.recipient_id === userID) {
                        return (<p className = "left-bubble">{item.message}</p>)
                    }
                    if(item.sender_id === userID && item.recipient_id === id) {
                        return <p className = "right-bubble">{item.message}</p>
                    }
                    return null;
                })}
            </div>
            <form onSubmit = {(e) => handleSubmit(e)}>
            <InputGroup style = {{'bottom': '-17px', 'position':'absolute'}} className="mb-3">
                <FormControl
                placeholder="Reply to username.."
                />
                <Button type = "submit" variant="outline-secondary" id="button-addon2">
                Send
                </Button>
            </InputGroup>
            </form>
        </Card>
        ))}
        </>
    );
}