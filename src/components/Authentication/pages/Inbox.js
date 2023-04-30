import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Card } from "react-bootstrap";
import { mailAction } from "../../../store/mail-slice";
import ViewMail from "./ViewMail";
import useHttp from "../../../hooks/use-http";

const Inbox = () => {
  const dispatch = useDispatch();
  const {sendRequest} = useHttp()
  const {receivedMail, changed} = useSelector((state) => state.mail);
  const senderMail = useSelector((state) => state.auth.email);
  const email = senderMail.replace("@", "").replace(".", "");

const viewMailHandler = (mail) => {
  sendRequest({
    url: `https://mail-box-client-212c3-default-rtdb.firebaseio.com/rec${email}/${mail.id}.json`,
    method: 'PUT',
    body: ({...mail, isRead: true})
  })
  dispatch(mailAction.viewMailHandle({id: mail.id}))
}
useEffect(() => {
  const transFormData = (data) => {
    const newData = []
    for(let key in data) {
      newData.push({id: key, ...data[key]})
    }
    dispatch(mailAction.updateReceivedMail({mail: newData}))
  }
  sendRequest({
    url: `https://mail-box-client-212c3-default-rtdb.firebaseio.com/rec${email}.json`
  }, transFormData)
}, [sendRequest, changed, dispatch, email])

  // const viewMailHandler = async (mail) => {
  //   await fetch(
  //     `https://mail-box-client-212c3-default-rtdb.firebaseio.com/rec${email}/${mail.id}.json`,
  //     {
  //       method: "PUT",
  //       body: JSON.stringify({ ...mail, isRead: true }),
  //     }
  //   );
  //   dispatch(mailAction.viewMailHandle({ id: mail.id }));
  // };
  // const fetchReceivedMail = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://mail-box-client-212c3-default-rtdb.firebaseio.com/rec${email}.json`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Could not fetch sent mail");
  //     }
  //     const data = await response.json();
  //     const newData = [];
  //     for (let key in data) {
  //       newData.push({ id: key, ...data[key] });
  //     }
  //     dispatch(mailAction.updateReceivedMail({ mail: newData }));
  //      console.log(newData);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchReceivedMail();
  // }, [changed]);

  return (
    <Card>
      <Card.Header>Inbox</Card.Header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>.</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Sender</th>
          </tr>
        </thead>
        <tbody>
          {receivedMail.map((mail) => (
            <tr key={mail.id}>
              <td style={{ color: "blue", fontSize: "40px" }}>
                {!mail.isRead && "."}
              </td>
              <td>{mail.subject}</td>
              <td>{mail.body}</td>
              <td>{mail.sender}</td>
              <td>
                <Button variant="success" onClick={() => viewMailHandler(mail)}>View</Button>
              </td>
              <ViewMail mail={mail} email={email} type={'received'}/>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default Inbox;
