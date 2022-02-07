import React from "react";
import { NavBar } from "../../components/navbar";
import axios from 'axios';
import { useState } from "react";
import { useEffect } from "react";
import { PageContainer } from "../../components/pageContainer";
import styled from "styled-components";
import accountIcon from "../../images/account.png";

const Main = styled.div`
    margin: 2%;
    height: 684px;
    
`;

const Card = styled.div`
    // width: 20%;
    min-width: 250px;
    display: inline-block;
    background: white; 
    // border-radius: 5px; 
    border: transparent;
    // border: transparent 0 none   
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
        width: 200px;
        height: auto;
    }
`;

const TitleComponent = styled.div`
    text-align: center;
    padding: 10px;  
    font-size: 20px;
    
`;

export function YourProfile(props){
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
        <Main>
            <div>
                <Card>
                    <ImageComponent>
                        <img src = {accountIcon} alt = "accountIcon"/>
                    </ImageComponent>
                    <TitleComponent>
                        <h4>
                            <a href="#profile" style = {{fontWeight:'bold'}}>{props.email}</a>
                        </h4>
                    </TitleComponent>
                </Card>
            </div>
        </Main>

            <h1>sai gon xin chao anh em</h1>
        </PageContainer>
        </>
    );
}