import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory} from 'react-router-dom';
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
	let history = useHistory();
	const [email, setEmail] = useState('Not logged in');
	useEffect(() => {
		axios.defaults.withCredentials = true;

		axios.post('http://localhost:3001/me', { withCredentials: true })
			.then((response) => {
				console.log("This is response:", response.data)
				setEmail(response.data.full_name)
			})
			.catch((err) => {
				history.goBack();
				console.log("CHP/index.jsx" + err);
			})
	}, [])

	useEffect(() => {
		document.title = "Patient Home Page";  
	  }, []);

	return (<>
		<NavBar email={email} />
		<PageContainer>
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-sm-6">
						<div className="card-box bg-blue">
							<div className="inner">
								<h1>Your Profile</h1>
							</div>
							<div className="icon">
								<img src={accountIcon} alt="account icon" />
							</div>
							<Link to="/customerhomepage/yourprofile"><div className="card-box-footer"></div></Link>
						</div>
					</div>

					<div className="col-lg-4 col-sm-6">
						<div className="card-box bg-green">
							<div className="inner">
								<h1>Appointments</h1>
							</div>
							<div className="icon">
								<img src={calendarIcon} alt="calendar icon" />
							</div>
							<Link to="/customerhomepage/appointments"><div className="card-box-footer"></div></Link>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6">
						<div className="card-box bg-orange">
							<div className="inner">
								<h1>Video Call</h1>
							</div>
							<div className="icon">
								<img src={videoIcon} alt="video icon" />
							</div>
							<Link to="/customerhomepage/videocall"><div className="card-box-footer"></div></Link>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6">
						<div className="card-box bg-red">
							<div className="inner">
								<h1>Chat</h1>
							</div>
							<div className="icon">
								<img src={chatIcon} alt="chat icon" />
							</div>
							<Link to="/customerhomepage/chat"><div className="card-box-footer"></div></Link>
						</div>
					</div>
					<div className="col-lg-4 col-sm-6">
						<div className="card-box bg-purple">
							<div className="inner">
								<h1>Documents</h1>
							</div>
							<div className="icon">
								<img src={documentsIcon} alt="documents icon" />
							</div>
							<Link to="/customerhomepage/documents"><div className="card-box-footer"></div></Link>
						</div>
					</div>
				</div>
			</div>
		</PageContainer></>
	);
}