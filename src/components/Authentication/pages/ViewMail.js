import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../../store/mail-slice";
import useHttp from "../../../hooks/use-http";

const ViewMail = (props) => {
  const {sendRequest} = useHttp()
  const dispatch = useDispatch();
  const viewMail = useSelector((state) => state.mail.viewMail);
  const viewMailHandler = () => {
    dispatch(mailAction.mailHandle());
  };
  const deleteMailHandler =  () => {
    let url;
    if(props.type === 'received'){
      url = `https://mail-box-client-212c3-default-rtdb.firebaseio.com/rec${props.email}/${props.mail.id}.json`;
      dispatch(mailAction.deleteReceivedMail(props.mail.id))
    }else{
      url = `https://mail-box-client-212c3-default-rtdb.firebaseio.com/sent${props.email}/${props.mail.id}.json`;
      dispatch(mailAction.deleteSentMail(props.mail.id))
    }
    sendRequest({
      url: url,
      method: 'DELETE'
    })
     dispatch(mailAction.mailHandle())
    // if(props.type === 'received'){
    //     url = `https://mail-box-client-212c3-default-rtdb.firebaseio.com/rec${props.email}/${props.mail.id}.json`
    // }else{
    //     url = `https://mail-box-client-212c3-default-rtdb.firebaseio.com/sent${props.email}/${props.mail.id}.json`
    // }
    // await fetch(url, {method:'DELETE'})
    // if(props.type === 'received'){
    //     dispatch(mailAction.deleteReceivedMail(props.mail.id))
    // }else{
    //     dispatch(mailAction.deleteSentMail(props.mail.id))
    // }
  }

  return (
    <Modal
      show={viewMail}
      onHide={viewMailHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Mail</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.mail.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteMailHandler}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewMail;
