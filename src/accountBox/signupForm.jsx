import React, { useContext } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../components/marginer"
import { AccountContext } from "./accountContext";

export function SignUpForm(props){
    const { switchToLogin } = useContext(AccountContext);

    return <BoxContainer>
        <FormContainer>
            <Input type ="text" name= "txt" placeholder="Full Name"/>
            <Input type="email" name="email" placeholder="Email"/>
            <Input type ="password" name="password" placeholder="Password"/>
            <Input type ="password" name="password" placeholder="Confirm Password"/>
        </FormContainer>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit">Register</SubmitButton>
        <Marginer direction="vertical" margin="1em" />
        <MutedLink>Already have an account?<BoldLink href ="#" onClick={switchToLogin}>Login</BoldLink></MutedLink>
    </BoxContainer>
}