import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory} from 'react-router-dom';
import { EmpNavBar } from "../../components/Empnavbar";
import { PageContainer } from "../../components/pageContainer";
import './style.css';
import axios from 'axios';
import accountIcon from "../../images/account_w.png";
import calendarIcon from "../../images/calendar_w.png";
import chatIcon from "../../images/chat_w.png";
import documentsIcon from "../../images/folder_w.png";
import videoIcon from "../../images/video_w.png";

export function EmployeeHomePage(props) {
	let history = useHistory();
	const [email, setEmail] = useState('Not logged in');
	useEffect(() => {
		axios.defaults.withCredentials = true;

		axios.post('http://localhost:3001/me', { withCredentials: true })
			.then((response) => {
				console.log("This is response:", response.data)
				setEmail(response.data.email)
			})
			.catch((err) => {
				history.goBack();
				console.log("CHP/index.jsx- From DoctorHomePage" + err);
			})
	})

	return (<>
		<EmpNavBar email={email} />
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
							<Link to="/EmployeeHomePage/EmpYourProfile"><div class="card-box-footer">View More</div></Link>
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
							<Link to="/Employeehomepage/EmpAppointments"><div class="card-box-footer">View More</div></Link>
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
							<Link to="/EmployeeHomePage/empvideocall"><div class="card-box-footer">View More</div></Link>
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
							<Link to="/EmployeeHomePage/empchat"><div class="card-box-footer">View More</div></Link>
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
							<Link to="/Employeehomepage/EmpDocuments"><div class="card-box-footer">View More</div></Link>
						</div>
					</div>
				</div>
			</div>
		</PageContainer></>
	);
}