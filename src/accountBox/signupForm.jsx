import React, { useContext, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../components/marginer"
import { AccountContext } from "./accountContext";
import axios from "axios";

export function SignUpForm(props){
    const { switchToLogin } = useContext(AccountContext);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("name: " + name)
        // console.log("email: " + email)
        // console.log("password: " + password)
        axios.post('http://localhost:3001/register', {
            full_name: name,
            email : email,
            password: password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error.response);
          });
    }

    return <BoxContainer>
        <FormContainer onSubmit = {e => {handleSubmit(e)}}>
            <Input type ="text" name= "txt" placeholder="Full Name" 
                onChange = {e => setName(e.target.value)}/>
            <Input type="email" name="email" placeholder="Email"
                onChange = {e => setEmail(e.target.value)}/>
            <Input type ="password" name="password" placeholder="Password"
                onChange = {e => setPassword(e.target.value)}/>
            <Input type ="password" name="password" placeholder="Confirm Password"/>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit">Register</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
        </FormContainer>
        
        <MutedLink>Already have an account?<BoldLink href ="#" onClick={switchToLogin}>Login</BoldLink></MutedLink>
    </BoxContainer>
}