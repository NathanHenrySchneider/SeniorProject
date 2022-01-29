import React from "react";
import styled from "styled-components";
import { BrandLogo } from "../brandLogo";
import { Marginer } from "../marginer";
import { Link } from "react-router-dom";

const NavBarContainer = styled.div`
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5em;
`;

const AccessibilityContainer = styled.div`
    display:flex;
`;

const AnchorLink = styled.a`
    font-size: 10px;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    transition: all 200ms ease-in-out;

    &:hover{
        filter: contrast(0.6);
    }
`;

const NavStyle ={
    color:"white"
}

export function NavBar(props){
    return (
    <NavBarContainer>
        <BrandLogo />
            <AccessibilityContainer>
                <AnchorLink>My Account</AnchorLink>
                <Marginer direction="horizontal" margin={17}/>
                <AnchorLink><Link style={NavStyle} to = "/">Logout</Link></AnchorLink>
            </AccessibilityContainer>
    </NavBarContainer>
    );
}