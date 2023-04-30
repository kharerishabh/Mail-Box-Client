import React from "react";
import classes from "./Header.module.css";
import { Link, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import ComposeMail from "../pages/ComposeMail";
import { authActions } from "../../../store/auth-slice";
import { mailAction } from "../../../store/mail-slice";

const Header = () => {
  const dispatch = useDispatch()
  const mail = useSelector(state => state.auth.email)

  const logOutHandler = () => {
    dispatch(authActions.logOut())
    dispatch(mailAction.updateReceivedMail({mail: []}))
    dispatch(mailAction.updateSentMail({mail: []}))
  }

  return (<main>
    <header className={classes.header}>
      <h1 className={classes['header-title']}>Mailbox</h1>
      <div>
        <button onClick={() => dispatch(uiActions.handleShow())}>Compose</button>
      </div>
      <div className={classes.actions}>
        <Link to='inbox'>Inbox</Link>
      </div>
      <div className={classes.actions}>
        <Link to='sent'>Sent Mail</Link>
      </div>
      <div className={classes.actions}>
        <h6>Mail</h6>
        <button onClick={logOutHandler}>Logout</button>
      </div>
    </header>
    <ComposeMail/>
    <Outlet/>
  </main>);
};

export default Header;
