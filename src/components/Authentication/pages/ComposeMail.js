import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { uiActions } from "../../../store/ui-slice";
const ComposeMail = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.ui.show);
  const email = useSelector((state) => state.auth.email);
  const senderMail = email.replace('@', '').replace('.', '')
  const emailRef = useRef("");
  const subjectRef = useRef("");
  const mailBodyRef = useRef("");

  const composeMailHandler = async (event) => {
    event.preventDefault();
    const receivedMail = emailRef.current.value.replace("@", "").replace(".", "");
    const receivedMailData = {
      sender: email,
      subject: subjectRef.current.value,
      body: mailBodyRef.current.value,
      idRead: false
    };
    const senderMailData = {
        sender: emailRef.current.value,
        subject: subjectRef.current.value,
        body: mailBodyRef.current.value
    }
    try {
      await fetch(
        `https://mail-box-client-212c3-default-rtdb.firebaseio.com/rec${receivedMail}.json`, {

        method: 'POST',
        body: JSON.stringify(receivedMailData),
        });
        await fetch(`https://mail-box-client-212c3-default-rtdb.firebaseio.com/sent${senderMail}.json`, {
            method: 'POST',
            body: JSON.stringify(senderMailData)
        })
        dispatch(uiActions.handleShow())
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Modal show={show} onHide={() => dispatch(uiActions.handleShow())}>
      <Modal.Header closeButton>
        <Modal.Title>New Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={composeMailHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="subject"
              autoFocus
              ref={subjectRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} ref={mailBodyRef} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ComposeMail;