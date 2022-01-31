import React from "react";
import { BoxContainer, FormContainer, Input, SubmitButton } from "./common";
import { Marginer } from "../components/marginer";
import { useHistory } from "react-router-dom";

export function EmployeeLoginForm(props){

    let history = useHistory();

    return <BoxContainer>
        <FormContainer>
            <Input type="email" name="email" placeholder="Email"/>
            <Input type ="password" name= "password" placeholder="Password"/>
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="button" onClick={() => {history.push("/EmployeeHomePage")}}>Login</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
    </BoxContainer>
}