import React from "react";
import styled from "styled-components";
import { NavBar } from "../../components/navbar";
import { PageContainer } from "../../components/pageContainer";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
// import { TopSection } from "../CustomerHomePage/topSection";
// import accountIcon from "../../images/account.png";
// import calendarIcon from "../../images/calendar.png";
// import chatIcon from "../../images/chat.png";
// import documentsIcon from "../../images/folder.png";
// import videoIcon from "../../images/video.png";



export function CustomerHomePage(props){
	let history = useHistory();

	const [email, setEmail] = useState('Not logged in');
	useEffect(() => {
		axios.defaults.withCredentials = true;

		axios.post('http://localhost:3001/me', {withCredentials: true})
		.then((response) => {
		  console.log("This is response:",response.data)
		  setEmail(response.data.email)
		})
		.catch((err) => {
			history.goBack()
			console.log("CHP/index.jsx" +err);
		})
	})
	
	const NavStyle ={
		color:"Black"
	}

    return (<>
        <NavBar email = {email}/>
    	<PageContainer>
			{/* <TopSection> */}
        	<Main>
			<div>
				<PseudoBorder>Home Page</PseudoBorder>
			</div>
			<Card>
				<ImageComponent>
					 <img src="https://i.stack.imgur.com/34AD2.jpg" alt = "accountIcon"/> 
					{/*<img src = {accountIcon} alt = "accountIcon"/>*/}
				</ImageComponent>
				<TitleComponent>
               	 <h4><Link style={NavStyle} to="/customerhomepage/yourprofile">Your Profile</Link></h4>
				</TitleComponent>
			</Card>
        	<Card>
				<ImageComponent>
					 <img src="https://www.telestax.com/wp-content/uploads/2018/01/Lumin-header.png" alt = "calendarIcon"/> 
					{/*<img src = {calendarIcon} alt = "calendarIcon"/>*/}
				</ImageComponent>
				<TitleComponent>
            	<h4><Link style={NavStyle} to="/customerhomepage/appointments">Appointments</Link></h4>
				</TitleComponent>
			</Card>
        	<Card>
				<ImageComponent>
					 <img src="https://www.payetteforward.com/wp-content/uploads/2019/05/what-is-video-calling-828x466.jpg" alt = "videoIcon"/> 
					{/*<img src = {videoIcon} alt = "videoIcon"/>*/}
				</ImageComponent>
				<TitleComponent>
            	<h4><Link style={NavStyle} to="/customerhomepage/videocall">Video Call</Link></h4>
				</TitleComponent>
			</Card>
        	<Card>
				<ImageComponent>
					<img src="https://miro.medium.com/max/1400/1*M_PoTEmelbIbw3nLcWHjSg.png" alt = "chatIcon"/> 
					{/*<img src = {chatIcon} alt = "chatIcon"/>*/}
				</ImageComponent>
				<TitleComponent>
            	<h4><Link style={NavStyle} to="/customerhomepage/chat">Chat</Link></h4>
				</TitleComponent>
			</Card>
        	<Card>
				<ImageComponent>
					 <img src="https://grafimedia.eu/wp-content/uploads/2017/12/Document-as-a-Service-DaaS-by-Grafimedia-Health-IT-SaaS-1.jpg" alt = "documentsIcon"/> 
					{/*<img src = {documentsIcon} alt = "documentsIcon"/>*/}
				</ImageComponent>
				<TitleComponent>
            	<h4><Link style={NavStyle} to="/customerhomepage/documents">Documents</Link></h4>
				</TitleComponent>
				</Card>
			</Main>
		{/* </TopSection> */}
    </PageContainer></>
    );
}

const Main = styled.div`
    margin: 2%;
    height: 684px;
    
`;

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

const Card = styled.div`
// width: 20%;
min-width: 250px;
display: inline-block;
box-shadow: 2px 2px 20px black;
background: white; 
border-radius: 5px; 
margin: 2%;

`;

const ImageComponent = styled.div`
   
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
	position: relative;
	display: inline-block;
	margin-top: 5%;
	margin-bottom: 5%;
  	margin-left: 10%;
	margin-right: 5%;
  	width: 50%; 
    img {
        width: 190px;
        height: 190px;
    }
`;
const TitleComponent = styled.div`
    text-align: center;
    padding: 10px;  
    font-size: 20px;
    
`;