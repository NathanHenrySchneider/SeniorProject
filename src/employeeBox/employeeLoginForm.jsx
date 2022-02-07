import React from "react";
import { BoxContainer, FormContainer, Input, SubmitButton } from "./common";
import { Marginer } from "../components/marginer";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert'

export function EmployeeLoginForm(props){

    let history = useHistory();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[err, setError] = useState(false);
    const[message, setMessage] = useState('');

    const handleSubmit = (e) => {
        console.log("inside handleSubmit")
        e.preventDefault();

        axios.post('http://localhost:3001/doctor-login', {
            email : email,
            password: password
          },{
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
          .then(function (response) {
              history.push("/EmployeeHomePage")
          })
          .catch(function (error) {
            setError(true);
            if(error.response) setMessage(error.response.data)
            else setMessage("Something went wrong.")
          });
    }
    
    return <BoxContainer>
        <FormContainer onSubmit={e=> {handleSubmit(e)} }>
            <Input type="email" name="email" placeholder="Email"
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Input type ="password" name= "password" placeholder="Password"
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            {err ? <Alert variant = "danger">{message}</Alert> : <></>}
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="button" onClick={() => {history.push("/EmployeeHomePage")}}>Login</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
    </BoxContainer>
}