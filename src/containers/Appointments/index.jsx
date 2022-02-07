import React from "react";
import { PageContainer } from "../../components/pageContainer";
import { NavBar } from "../../components/navbar";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export function Appointments(props){
    const [email, setEmail] = useState('Not logged in');
	useEffect(() => {
		axios.defaults.withCredentials = true;

		axios.post('http://localhost:3001/me', {withCredentials: true})
		.then((response) => {
		  console.log(response.data)
		  setEmail(response.data.email)
		})
		.catch((err) => {
			console.log("CHP/index.jsx" +err);
		})
	}, [])
    return (<>
        <NavBar email = {email}/>
    	<PageContainer>
				<PseudoBorder>Home Page</PseudoBorder>
        </PageContainer>
        </>
    );
}

const PseudoBorder = styled.h1`
position: relative;
color: black;
display: inline-block;
&:after {
    content:'';
position: absolute;
display: inline-block;
left: 0;
top: 100%;
margin: 10px auto;
width: 33%;
height: 6px;
background: #00f;
  }
`;