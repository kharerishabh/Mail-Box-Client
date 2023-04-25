import { Switch, Route } from "react-router-dom";
import "./App.css";
import Auth from "./components/Authentication/Auth";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import { useSelector } from "react-redux";
import Header from "./components/Authentication/Layout/Header";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {!isAuthenticated && <Auth />} {isAuthenticated && <Header />}
        </Route>
        <Route path="/forgot">
          <ForgotPassword />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
