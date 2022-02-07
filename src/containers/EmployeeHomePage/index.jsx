import React, { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
import { PageContainer } from "../../components/pageContainer";
import { TopSection } from "./topSection";
import axios from "axios";

export function EmployeeHomePage(props){
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
	

    return (
    <PageContainer>
        <TopSection>
            <NavBar email = {email}/>
        </TopSection>
    </PageContainer>
    );
}