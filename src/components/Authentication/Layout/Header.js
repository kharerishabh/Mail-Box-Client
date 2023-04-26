import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import ComposeMail from "../pages/ComposeMail";
import { authActions } from "../../../store/auth-slice";

const Header = () => {
  const dispatch = useDispatch()
  return (<main>
    <header className={classes.header}>
      <h1 className={classes['header-title']}>Mailbox</h1>
      <div>
        {/* <Link to='/compose'>Compose</Link> */}
        <button onClick={() => dispatch(uiActions.handleShow())}>Compose</button>
      </div>
      <div className={classes.actions}>
        <Link to='/inbox'>Inbox</Link>
      </div>
      <div className={classes.actions}>
        <Link to='/sent'>Sent Mail</Link>
      </div>
      <div className={classes.actions}>
        <button onClick={() => dispatch(authActions.logOut())}>Logout</button>
      </div>
    </header>
    <ComposeMail/>
  </main>);
};

export default Header;
