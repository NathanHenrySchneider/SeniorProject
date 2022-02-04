import React from "react";
// import styled from "styled-components";
// import { BrandLogo } from "../brandLogo";
// import { Marginer } from "../marginer";
import { useHistory } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import {Container} from 'react-bootstrap';
import axios from 'axios';

//old styles commented at the bottom if you need it 
export function NavBar(props){
    let history = useHistory();
    return (
        <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src= {require("./newLogo.png")}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
          <strong style = {{color:'#122a8e', size: '33px', margin:'0 0 0 5px'}}>Tele-Medic</strong>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text style = {{marginRight: '7px'}}>
                <a href="#profile" style = {{fontWeight:'bold'}}>{props.email}</a>
            </Navbar.Text>{'|'}
            <Navbar.Text style = {{marginLeft: '7px'}}>
                <button style = {{border: 'none', background: 'none'}} onClick = {()=>{
                  axios.post('http://localhost:3001/logout')
                  .then((response) => {
                    if(response.statusText === "OK"){
                      history.goBack();
                    }
                  }).catch((err) => {
                    console.log(err.response.data);
                  })
                }}>Sign Out</button>
            </Navbar.Text>
            </Navbar.Collapse>
        </Container>
      </Navbar>

    // <NavBarContainer>
    //     <BrandLogo />
    //         <AccessibilityContainer>
    //             <AnchorLink>My Account</AnchorLink>
    //             <Marginer direction="horizontal" margin={17}/>
    //             <AnchorLink><Link style={NavStyle} to = "/">Logout</Link></AnchorLink>
    //         </AccessibilityContainer>
    // </NavBarContainer>
    
    );
}
// const NavBarContainer = styled.div`
//     width: 100%;
//     height: 65px;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 0 1.5em;
// `;

// const AccessibilityContainer = styled.div`
//     display:flex;
// `;

// const AnchorLink = styled.a`
//     font-size: 10px;
//     color: #fff;
//     cursor: pointer;
//     text-decoration: none;
//     outline: none;
//     transition: all 200ms ease-in-out;

//     &:hover{
//         filter: contrast(0.6);
//     }
// `;

// const NavStyle ={
//     color:"white"
// }
