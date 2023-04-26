import React, { useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../../store/mail-slice";
import ViewMail from "./ViewMail";
const SentMail = () => {
   const dispatch = useDispatch()
   const sentMail = useSelector(state => state.mail.sentMail)
   const senderMail = useSelector(state => state.auth.email)
   const mail = senderMail.replace('@', '').replace('.', '')

   const viewMailHandler = () => {
    dispatch(mailAction.mailHandle())
   }
   const fetchSentMail = async () => {
        try{
            const response = await fetch(`https://mail-box-client-212c3-default-rtdb.firebaseio.com/sent${mail}.json`)

            if(!response.ok) {
                let errorMessage = 'Unable to fetch Mails'
                throw new Error(errorMessage)
            }
            const data = await response.json()
            const newData = []
            for (let key in data){
                newData.push({id: key, ...data[key]})
            }
            dispatch(mailAction.updateSentMail({mail: newData}))
            console.log(newData)
        }catch(err){alert(err)}
   }
   useEffect(() => {
    fetchSentMail()
   }, [])
   
return (
    <Card>
    <Card.Header>Sent Mail</Card.Header>  
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Content</th>
          <th>Sent To</th>
        </tr>
      </thead>
      <tbody>
        {sentMail.map((mail) => (
          <tr key={mail.id}>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.sentTo}</td>
            <td>
              <Button variant="success" onClick={() => viewMailHandler()}>View</Button>
            </td>
            <ViewMail message={mail.body}/>
          </tr>
        ))}
      </tbody>
    </Table>
  </Card>
)
}

export default SentMail;