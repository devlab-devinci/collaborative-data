import React from "react";
import "./App.scss";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

// LAYOUT
import Header from "../Header";
import Footer from "../Footer";

// LOG
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import SignOutPage from "../SignOut";
import PasswordForgetPage from "../PasswordForget";

// PAGES
import HomePage from "../Home";
import AccountPage from "../Account";
import UsersPage from "../Admin/users";
import OffersPage from "../Admin/offers";
import ProposePage from "../Propose";
import Terms from "../Terms";
import Privacy from "../Privacy";


import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <div>
      <Header />

      <main>
        <Route exact path="/" render={() => (
            <Redirect from="" to="/home" />
        )}/>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_OUT} component={SignOutPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.USERS} component={UsersPage} />
        <Route path={ROUTES.PROPOSE} component={ProposePage} />
        <Route path={ROUTES.TERMS} component={Terms} />
        <Route path={ROUTES.PRIVACY} component={Privacy} />
      </main>

      <Footer history={history} />
    </div>
  </Router>
);

export default withAuthentication(App);
