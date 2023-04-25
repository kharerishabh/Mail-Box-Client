import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import classes from './Auth.module.css'

const Auth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.haveAccount);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const logInSignUpHandler = () => {
    dispatch(authActions.haveAccount());
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (!isLoggedIn) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4kjI5pHTqGWrGqWJnOqruOzCFA-GuP2c",
          {
            method: "Post",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Text": "application/json",
            },
          }
        );
        if (!response.ok) {
          let errorMessage = "Authenticated Signup Failed";
          throw new Error(errorMessage);
        }
        alert("Your Account Has Been Created You can Login Now");
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4kjI5pHTqGWrGqWJnOqruOzCFA-GuP2c",
          {
            method: "Post",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Text": "application/json",
            },
          }
        );
        if (!response.ok) {
          let errorMessage = "Login Failed Please Try Again";
          throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log(data);
        const email = enteredEmail.replace("@", "").replace(".", "");
        dispatch(authActions.logIn({ token: data.idToken, email: email }));
      } catch (err) {
        alert(err);
      }
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const forgotPasswordHandler = async () => {
    const enteredEmail = emailRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA4kjI5pHTqGWrGqWJnOqruOzCFA-GuP2c",{
            method: 'Post',
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: enteredEmail
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
      );
      if(!response.ok){
        let errorMessage = 'Fail to Send Request'
        throw new Error(errorMessage)
      }
      alert('Password Reset Link is sent, please check your mail')
    } catch (err) {
      alert(err);
    }
  };
  return ( <div>
    <div className={classes.auth}>
      <h1>{isLoggedIn ? "Login" : "SignUp"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLoggedIn ? "Login" : "SignUp"}</button>
        </div>
        <div className={classes.actions}>
          {isLoggedIn && (
            <button type="button" onClick={forgotPasswordHandler}>
              Forgot Password
            </button>
          )}
        </div>
      </form>
    </div>
    <div className={classes.actions}>
      <button onClick={logInSignUpHandler}>
        {isLoggedIn
          ? "Dont have an account? SignUp"
          : "Have an account? Login"}
      </button>
    </div>
  </div>
)
};
export default Auth;
