import React from "react";
import { useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import ComposeEmail from "./ComposeEmail";
import OpenMessage from "./OpenMessage";

export function Chat(props) {
  const [email, setEmail] = useState("Not logged in");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/me", { withCredentials: true })
      .then((response) => {
        console.log("/me response:", response.data);
        setEmail(response.data.email);
        // response.data.user_id
        axios
          .get("http://localhost:3001/messaging")
          .then((response) => {
            console.log(response.data);
            setChat(response.data);
          })
          .catch((err) => console.log("message err" + err));
      })
      .catch((err) => {
        console.log("CHP/index.jsx" + err);
      });
  }, []);

  const formatDateTime = (date_time) => {
    const date = date_time.split("T")[0];
    const time = date_time.split("T")[1];
    return date + " " + time.split(".")[0];
  };

  //Did not delete from DB.
  const handleDelete = (id)=>{
      setChat(chat.filter(msg => msg.message_id !== id))
  }
  
  return (
    <>
      <NavBar email={email} />
      <>
        <h1 className="text-center mb-3 mt-4">Message Portal</h1>
        <>
          <div className="text-center">
            <Button href="javascript:location.reload(true)" variant="primary w-25">Refresh</Button>{" "}
            {/* <a href="javascript:location.reload(true)">Refresh this page</a> */}
            <ComposeEmail></ComposeEmail>
          </div>
        </>
      </>
      <Container fluid="md">
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Sender</th>
              <th>Subject</th>
              <th className="text-center"> Open</th>
              <th className="text-center"> Delete</th>
            </tr>
          </thead>
          <tbody>
            {chat.map((msg) => (
              <tr key={msg.message_id}>
                <td>{formatDateTime(msg.date_time)}</td>
                <td>{msg.sender_id}</td>
                <td>{msg.subject}</td>
                <td colSpan={1.5} className="text-center">
                  <OpenMessage message_id={msg.message_id} subject="Null" sender_id={msg.sender_id} message={msg.message}></OpenMessage>
                </td>
                <td colSpan={1.5} className="text-center">
                  <Button variant="danger" onClick={handleDelete.bind(this, msg.message_id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
