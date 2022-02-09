import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { NavBar } from "../../components/navbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';
import accountIcon from "../../images/account_w.png";
import calendarIcon from "../../images/calendar_w.png";
import chatIcon from "../../images/chat_w.png";
import documentsIcon from "../../images/folder_w.png";
import videoIcon from "../../images/video_w.png";

export function CustomerHomePage(props) {
	const [email, setEmail] = useState('Not logged in');
	useEffect(() => {
		axios.defaults.withCredentials = true;

		axios.post('http://localhost:3001/me', { withCredentials: true })
			.then((response) => {
				console.log("This is response:", response.data)
				setEmail(response.data.email)
			})
			.catch((err) => {
				console.log("CHP/index.jsx" + err);
			})
	}, [])


	return (<>
		<NavBar email={email} />
		<PageContainer>
			<div class="container">
				<div class="row">
					<div class="col-lg-4 col-sm-6">
						<div class="card-box bg-blue">
							<div class="inner">
								<h1>Your Profile</h1>
							</div>
							<div class="icon">
								<img src={accountIcon} alt="account icon" />
							</div>
							<Link to="/customerhomepage/yourprofile"><div class="card-box-footer">View More</div></Link>
						</div>
					</div>

					<div class="col-lg-4 col-sm-6">
						<div class="card-box bg-green">
							<div class="inner">
								<h1>Appointments</h1>
							</div>
							<div class="icon">
								<img src={calendarIcon} alt="calendar icon" />
							</div>
							<Link to="/customerhomepage/appointments"><div class="card-box-footer">View More</div></Link>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6">
						<div class="card-box bg-orange">
							<div class="inner">
								<h1>Video Call</h1>
							</div>
							<div class="icon">
								<img src={videoIcon} alt="video icon" />
							</div>
							<Link to="/customerhomepage/videocall"><div class="card-box-footer">View More</div></Link>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6">
						<div class="card-box bg-red">
							<div class="inner">
								<h1>Chat</h1>
							</div>
							<div class="icon">
								<img src={chatIcon} alt="chat icon" />
							</div>
							<Link to="/customerhomepage/chat"><div class="card-box-footer">View More</div></Link>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6">
						<div class="card-box bg-purple">
							<div class="inner">
								<h1>Documents</h1>
							</div>
							<div class="icon">
								<img src={documentsIcon} alt="documents icon" />
							</div>
							<Link to="/customerhomepage/documents"><div class="card-box-footer">View More</div></Link>
						</div>
					</div>
				</div>
			</div>
		</PageContainer></>
	);
}