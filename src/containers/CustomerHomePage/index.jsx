import React from "react";
import styled from "styled-components";
import { NavBar } from "../../components/navbar";
import { PageContainer } from "../../components/pageContainer";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { TopSection } from "../CustomerHomePage/topSection";
const Main = styled.div`
    margin: 2%;
    height: 684px;
    
`;

const PseudoBorder = styled.h1`
position: relative;
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


const Card = styled.div`
width: 20%;
display: inline-block;
box-shadow: 2px 2px 20px black;
border-radius: 5px; 
margin: 2%;

`;

const ImageComponent = styled.div`
   
    border-top-right-radius: 5px;
    border-top-left-radius: 5px; 
    img {
        width: 100%;
        height: 100%;
    }
`;
const TitleComponent = styled.div`
    text-align: center;
    padding: 10px;  
    font-size: 20px;
    
`;

export function CustomerHomePage(props){
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
	
	const NavStyle ={
		color:"white"
	}

    return (<>
        <NavBar email = {email}/>
    <PageContainer>
		<TopSection>
        <Main>
		<div>
			<PseudoBorder>Home Page</PseudoBorder>
		</div>
		<Card>
			<ImageComponent>
				<img src="https://cdn.pixabay.com/photo/2018/01/09/03/49/the-natural-scenery-3070808_1280.jpg"/>
			</ImageComponent>
			<TitleComponent>
                <h4><Link style={NavStyle} to="/customerhomepage/yourprofile">Your Profile</Link></h4>
			</TitleComponent>
		</Card>
        <Card>
			<ImageComponent>
				<img src="https://cdn.pixabay.com/photo/2018/01/09/03/49/the-natural-scenery-3070808_1280.jpg"/>
			</ImageComponent>
			<TitleComponent>
            <h4><Link style={NavStyle} to="/customerhomepage/appointments">Appointments</Link></h4>
			</TitleComponent>
		</Card>
        <Card>
			<ImageComponent>
				<img src="https://cdn.pixabay.com/photo/2018/01/09/03/49/the-natural-scenery-3070808_1280.jpg"/>
			</ImageComponent>
			<TitleComponent>
            <h4><Link style={NavStyle} to="/customerhomepage/videocall">Video Call</Link></h4>
			</TitleComponent>
		</Card>
        <Card>
			<ImageComponent>
				<img src="https://cdn.pixabay.com/photo/2018/01/09/03/49/the-natural-scenery-3070808_1280.jpg"/>
			</ImageComponent>
			<TitleComponent>
            <h4><Link style={NavStyle} to="/customerhomepage/chat">Chat</Link></h4>
			</TitleComponent>
		</Card>
        <Card>
			<ImageComponent>
				<img src="https://cdn.pixabay.com/photo/2018/01/09/03/49/the-natural-scenery-3070808_1280.jpg"/>
			</ImageComponent>
			<TitleComponent>
            <h4><Link style={NavStyle} to="/customerhomepage/documents">Documents</Link></h4>
			</TitleComponent>
		</Card>




	</Main>
	</TopSection>
    </PageContainer></>
    );
}