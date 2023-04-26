import { Switch, Route } from "react-router-dom";
import "./App.css";
import Auth from "./components/Authentication/Auth";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Authentication/Layout/Header";
import Inbox from "./components/Authentication/pages/Inbox";
import SentMail from "./components/Authentication/pages/SentMail";
import { useEffect } from "react";
import { authActions } from "./store/auth-slice";
function App() {
  const {isAuthenticated, token, email} = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedEmail = localStorage.getItem('email')
    if(savedToken && savedEmail){
      dispatch(authActions.logIn({token: savedToken, email: savedEmail}))
    }
  }, [dispatch])
  useEffect(() => {
    if(isAuthenticated){
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
    }else{
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    }
  }, [isAuthenticated, email, token])

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {!isAuthenticated && <Auth />} {isAuthenticated && <Header />}
        </Route>
        <Route path="/forgot">
          <ForgotPassword />
        </Route>
        <Route path='/inbox'>
          <Inbox/>
        </Route>
        <Route path='/sent'>
          <SentMail/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
