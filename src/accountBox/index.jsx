import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { SignUpForm } from "./signupForm";
import Alert from 'react-bootstrap/Alert'

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BoxContainer = styled.div`
    width: 280px;
    min-height: 452px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15,15,15,0.28);
    position: relative;
    overflow: hidden;
`;

const TopContainer = styled.div`
    width: 100%;
    height: 222px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 1.8em;
    padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
    width: 160%;
    height: 486px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(60deg);
    top: -290px;
    left: -70px;
    background: rgb(9,9,121);
    background: linear-gradient(58deg, rgba(9,9,121,1) 20%, rgba(0,212,255,1) 100%);
`;

const HeaderContainer = styled.div`
    width: 100%;
    display:flex;
    align-items: flex-start;
    flex-direction: column;
`;

const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: #fff;
    z-index: 10;
    margin: 0;

`;

const SmallText = styled.h5`
    color: #fff;
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin: 0;
    margin-top: 7px;
`;

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
`;

const backdropVariants = {
    expanded:{
        width: "233%",
        height: "1050px",
        borderRadius: "20%",
        transform: "rotate(60deg)"
    },
    collapsed:{
        width: "160%",
        height: "486px",
        borderRadius: "50%",
        transform: "rotate(60deg)"
    }
}

const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
};

export function AccountBox(props){
    const [isExpanded, setExpanded] = useState(false);
    const[active, setActive] = useState("Login")
    
    const playExpandingAnimation = () =>{
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    }

    const switchToSignup = () =>{
        playExpandingAnimation();
        setTimeout(() =>{
            setActive("Sign Up");
        }, 400);
    }

    const switchToLogin = () =>{
        playExpandingAnimation();
        setTimeout(() =>{
            setActive("Login");
        }, 400);
    }
    
    const contextValue ={switchToSignup, switchToLogin};

    return (
    <AccountContext.Provider value={contextValue}>
        <AppContainer>
            <Alert variant = "warning" style = {{width:'280px', borderWidth:'medium'}}>
                Compatible browsers:<br/><b>Google Chrome</b>, <b>Firefox</b> and <b>Opera</b>.
            </Alert>
            <BoxContainer>
                <TopContainer>
                    <BackDrop  
                        initial={false} 
                        animate={isExpanded ? "expanded" : "collapsed"} 
                        variants={backdropVariants}
                        transition={expandingTransition}
                        />
                    {active === "Login" && <HeaderContainer>
                        <HeaderText>Welcome</HeaderText>
                        <HeaderText>Back</HeaderText>
                        <SmallText>Please sign-in to continue!</SmallText>
                    </HeaderContainer>}
                    {active === "Sign Up" && <HeaderContainer>
                        <HeaderText>Create</HeaderText>
                        <HeaderText>Account</HeaderText>
                        <SmallText>Please sign up to continue!</SmallText>
                    </HeaderContainer>}
                    <br/>
                </TopContainer>
                <InnerContainer>
                    {active === "Login" && <LoginForm/>}
                    {active === "Sign Up" && <SignUpForm/>}
                </InnerContainer>
            </BoxContainer>
        </AppContainer>
    </AccountContext.Provider>
    );
}