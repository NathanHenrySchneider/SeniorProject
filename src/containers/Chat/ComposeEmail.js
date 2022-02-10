import React, { Fragment, useState } from "react";
import index from "./index.jsx";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { ButtonGroup, ButtonToolbar, Form } from "react-bootstrap";


const ComposeEmail = ({user_id}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
      
    return (
        <>
        <Button variant="success w-25 mx-3" onClick={handleShow}>
         Compose
        </Button>
      
        <Modal 
            show={show} 
            onHide={handleClose} 
            animation={false}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-90w"
            >

            <Modal.Header closeButton>
            <Modal.Title>New Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="providerSelection">
                        <Form.Select>
                            <option>Please select a provider</option>
                            <option value="1">Doctor 1</option>
                            <option value="2">Doctor 2</option>
                            <option value="3">Doctor 3</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="messageSubject">
                        <Form.Label>Subject:</Form.Label>
                        <Form.Control/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="messageMessage">
                        <Form.Label>Message:</Form.Label>
                        <Form.Control as="textarea" rows={6} />
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button className="mr-3" variant="success" size="md">
                    Send
                    </Button>
                    <Button variant="danger" onClick={handleClose} size="md">
                    Delete
                    </Button>
                    </ButtonGroup>
            </Modal.Footer>
        </Modal>
          </>
        )};
    

export default ComposeEmail;
 