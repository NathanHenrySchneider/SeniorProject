import React, { useState, useEffect } from "react";
import "../navbar/style.css"
// import styled from "styled-components";
// import { BrandLogo } from "../brandLogo";
// import { Marginer } from "../marginer";
import { useHistory } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import {Container} from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
const bannerDefault = "You do not have any upcoming appointments";




//old styles commented at the bottom if you need it 
export function AppointmentBanner(props){
    // console.log("BANNER PROPS: " + props.nextApptWhen + props.nextApptWhom);
    // console.log("WHOMWHOM: " + String(props.nextAppt));
    const [email, setEmail] = useState('Not logged in');
    const [allAppointment, setAllAppointment] = useState([]);
    const [bannerMessage,setBannerMessage] = useState(bannerDefault);
    useEffect(()=> {
    axios.defaults.withCredentials = true;
    let arr = []
    let arrSorted = [];
    axios.post('http://')
    axios.post('http://localhost:3001/me', { withCredentials: true })
			.then((response) => {
				console.log("This is response:", response.data)
				setEmail(response.data.full_name)
        // console.log("YEEET")

        response.data.userAppointment.forEach((appt) => {
					let date = new Date(appt.appt_date)
					let iso = new Date(new Date(date).setHours(date.getHours() + 1)).toISOString()
					console.log(appt.appt_date + " " + iso)
					arr.push({
						
            when: String(date).split(" ").slice(0,5),
						whom: appt.doctor_name,
            start: new Date(appt.appt_date),
            // start: iso, 
					})
				  })
 
          arrSorted = arr.sort((a,b) => b.start.getTime() > a.start.getTime());

				  setAllAppointment(arrSorted);
        

          if (allAppointment.length > 0){

            setBannerMessage("Your next appointment is at " + String(allAppointment.at(1).when)  + " with " + String(allAppointment.at(1).whom));
          }else {

            response.data.userAppointment.forEach((appt) => {
              let date = new Date(appt.appt_date)
              let iso = new Date(new Date(date).setHours(date.getHours() + 1)).toISOString()
              console.log(appt.appt_date + " " + iso)
              console.log("ISO: " + String(iso));
              console.log("DATE: " + String(date));
              arr.push({
                
                  // title: parse(`<a style = "color:white;"><h4>Your next appointment is at ${iso} with ${appt.doctor_name}</h4></a>`),
                when: String(date).split(" ").slice(0,5),
                whom: appt.doctor_name,
                start: new Date(appt.appt_date),
                // start: iso, 
              })
              })
              arrSorted = arr.sort((a,b) =>  b.start.getTime() > a.start.getTime());
              setAllAppointment(arrSorted);
              // console.log("ALLAPOINTYUUUUUUUU: " + String(allAppointment));
              // setBannerMessage("Your next appointment is at " + String(allAppointment.at(1).when)  + " with " + String(allAppointment.at(1).whom));
          
          }

      })
      .catch((err) => {
				history.goBack();
				console.log("CHP/index.jsx" + err);
			})
	  }, []);

    useEffect(() => {
      // console.log("Yeet3");
      if (bannerMessage && allAppointment && allAppointment.length > 0 && bannerMessage === bannerDefault) {
        setAllAppointment(allAppointment.sort((a,b) => b.start > a.start ? 1: -1).sort((a, b) => b.date < a.date ? 1: -1));
        console.log("INSIDE");
        console.log(allAppointment);
        setBannerMessage("Your next appointment is at " + String(allAppointment.at(0).when)  + " with " + String(allAppointment.at(0).whom));
      }



    })

    
  
  


    let history = useHistory();
    return (
        <Navbar bg="red" variant="light">
        <Container>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text style = {{marginRight: '7px'}}>
              <a style = {{fontWeight:'bold'}}><Link to="/customerhomepage/appointments"> {bannerMessage}</Link></a>
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
