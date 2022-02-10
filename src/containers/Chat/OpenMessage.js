import React, { Fragment, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { ButtonGroup, Form, Row, Col} from "react-bootstrap";


//fetch messages where recipient_id == user_id
//currently hardcoded for demo


const OpenMessage = ({message_id, subject, sender_id}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
      
    return (
        <>
        <Button variant="success" onClick={handleShow}>
         Open
        </Button>
      
        <Modal 
            show={show} 
            onHide={handleClose} 
            animation={false}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-60w"
            >

            <Modal.Header closeButton>
            <Modal.Title>Consulation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="sender">
                        <Form.Label column sm="2"> From: </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue="Dr.Snow" />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} className="mb-3" controlId="message">
                        <Form.Label column sm="2"> Message: </Form.Label>
                        <Col sm="10">
                            <Form.Control 
                            plaintext readOnly as="textarea" rows={8} 
                            defaultValue="It was lovely to meet you yesterday. I hope you will consider us for your healthcare needs." />
                        </Col>
                    </Form.Group>
                 </Form>
            </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button className="mr-3" variant="success" size="md">
                    Reply
                    </Button>
                    <Button variant="danger" onClick={handleClose} size="md">
                    Delete
                    </Button>
                    </ButtonGroup>
            </Modal.Footer>
        </Modal>
          </>
        )};
    

export default OpenMessage;
 