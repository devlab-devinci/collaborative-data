import React from "react";
import "./Header.scss";

import * as ROUTES from "../../constants/routes";
import { Container } from "react-bootstrap";
import { AuthUserContext } from "../Session";

const Header = () => (

    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <NavigationAuth authUser={authUser} />
            ) : (
                <NavigationNonAuth />
            )
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <header className="header">
      <Container>
        <div className="header__nav">
          <div className="header__left-nav">
            <a href={ROUTES.HOME} className="header__nav__link">Accueil</a>
            <a href="javascript:void()" className="header__nav__link">À propos</a>
          </div>
          <div className="header__right-nav">
            <a href={ROUTES.PROPOSE} className="header__nav__link">Proposer une offre</a>
            <a href={ROUTES.ACCOUNT} className="header__nav__link dropdown"><i className="far fa-user"></i> Alexis Buon</a>
            <nav className="header__socials">
              <a href="https://www.facebook.com/monhimike/" className="header__socials__link facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
              <a href="https://twitter.com/HiMike_App" className="header__socials__link twitter" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
              <a href="https://www.linkedin.com/company/hi-mike/" className="header__socials__link linkedin" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
            </nav>
          </div>
        </div>
      </Container>
    </header>
);

const NavigationNonAuth = () => (
  <header className="header">
    <Container>
      <div className="header__nav">
        <div className="header__left-nav">
          <a href={ROUTES.HOME} className="header__nav__link">Accueil</a>
          <a href="#" className="header__nav__link">À propos</a>
        </div>
        <div className="header__right-nav">
          <a href={ROUTES.PROPOSE} className="header__nav__link">Proposer une offre</a>
          <a href={ROUTES.SIGN_IN} className="header__nav__link dropdown"><i className="far fa-user"></i> Connexion</a>
          <nav className="header__socials">
            <a href="https://www.facebook.com/monhimike/" className="header__socials__link facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
            <a href="https://twitter.com/HiMike_App" className="header__socials__link twitter" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
            <a href="https://www.linkedin.com/company/hi-mike/" className="header__socials__link linkedin" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
          </nav>
        </div>
      </div>
    </Container>
  </header>
);

export default Header;
