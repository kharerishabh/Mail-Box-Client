import React, { useRef } from "react";
import classes from './Auth.module.css'


const ForgotPassword = () => {
  const emailRef = useRef("");
  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC9wPSRuUS2GTLr1XB7P-MenNJv0kqkCmA",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        let errorMessage = "Fail to Send Request";
        throw new Error(errorMessage);
      }
      alert("Password Reset Link sent, please check your mail");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className={classes.auth}>
      <form onSubmit={forgotPasswordHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.actions}>
          <button type="submit">Forgot Password</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;