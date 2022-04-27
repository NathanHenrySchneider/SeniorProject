import React, { useContext, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, SubmitButton } from "./common";
import { Marginer } from "../components/marginer"
import { AccountContext } from "./accountContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import 'react-phone-number-input/style.css';
import PhoneInput from "react-phone-number-input";

export function SignUpForm(props){
    const { switchToLogin } = useContext(AccountContext);
    const[name, setName] = useState('');
    const[phone, setPhone] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[err, setError] = useState(false);
    const[message, setMessage] = useState('');
    const[selects,setSelects] = useState();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', {
            full_name: name,
            email : email,
            phone_number: phone,
            password: password,
            user_type: selects
          })
          .then(function (response) {
            alert("Successfully created account. Please return to login.")
            console.log(response);
            
          })
          .catch(function (error) {
            setError(true);
            // console.log(error.response.data);
            if(error.response) setMessage(error.response.data)
            else setMessage("Something went wrong.")
          });
    }

    return <BoxContainer>
        <div>
            <select value={selects} onChange = {e => setSelects(e.target.value)}>
                <option selected value="Select">Select</option>
                <option value = "patient" >Patient</option>
                <option value = "doctor" >Doctor</option>
                <option value = "nurse" >Nurse</option>
            </select>
        </div>
        <Marginer direction="vertical" margin="0.4em" />
        <FormContainer onSubmit = {e => {handleSubmit(e)}}>
            <Input type ="text" name= "txt" placeholder="Full Name" 
                onChange = {e => setName(e.target.value)}/>
            <Input type="email" name="email" placeholder="Email"
                onChange = {e => setEmail(e.target.value)}/>
            <PhoneInput placeholder="Enter phone number" value={phone} onChange={setPhone}/>
            <Input type ="date" name="DOB" placeholder="Date Of Birth mm/dd/yyyy"/>
            <Input type ="password" name="password" placeholder="Password" onChange = {e => setPassword(e.target.value)}/>
            <Marginer direction="vertical" margin="1.6em" />
            {err ? <Alert variant = "danger">{message}</Alert> : <></>}
            <SubmitButton type="submit">Register</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
        </FormContainer>
        
        <small>Already have an account?<BoldLink href ="#" onClick={switchToLogin}>Login</BoldLink></small>
        <Marginer direction="vertical" margin="1em" />
    </BoxContainer>
}