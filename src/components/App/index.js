import React from "react";
import "./App.scss";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

// LAYOUT
import Header from "../Header/index.js";
import HeaderMobile from "../Header/mobile.js";
import Footer from "../Footer";

// LOG
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import SignOutPage from "../SignOut";
import PasswordForgetPage from "../PasswordForget";

// PAGES
import HomePage from "../Home";
import AboutPage from "../About";
import AccountPage from "../Account";
import UsersPage from "../Admin/users";
import OffersPage from "../Admin/offers";
import ProposePage from "../Propose";
import TermsPage from "../Terms";
import PrivacyPage from "../Privacy";


import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const history = createBrowserHistory();

const App = () => (
  <Router>
    <div>
      <HeaderMobile />
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
        <Route path={ROUTES.ABOUT} component={AboutPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.USERS} component={UsersPage} />
        <Route path={ROUTES.OFFERS} component={OffersPage} />
        <Route path={ROUTES.PROPOSE} component={ProposePage} />
        <Route path={ROUTES.TERMS} component={TermsPage} />
        <Route path={ROUTES.PRIVACY} component={PrivacyPage} />
      </main>

      <Footer history={history} />
    </div>
  </Router>
);

export default withAuthentication(App);
