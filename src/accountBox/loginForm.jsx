import React, { useContext } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../components/marginer";
import { AccountContext } from "./accountContext";
import { useHistory } from "react-router-dom";
import { Link} from "react-router-dom";

export function LoginForm(props){

    const { switchToSignup } = useContext(AccountContext);
    let history = useHistory();
    

    return <BoxContainer>
        <FormContainer>
            <Input type="email" name="email" placeholder="Email"/>
            <Input type ="password" name= "password" placeholder="Password"/>
            <Marginer direction="vertical" margin={10} />
            <MutedLink href = "#">Forgot your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="button" onClick={() => {history.push("/CustomerHomePage")}}>Login</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
        </FormContainer>
        <MutedLink>Don't have an account?<BoldLink href="#" onClick={switchToSignup}>Sign Up</BoldLink></MutedLink>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href = "#"><Link to="/EmployeeLogin">Employee Login</Link></MutedLink>
    </BoxContainer>
}