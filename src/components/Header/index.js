import React from "react";
import "./Header.scss";

import * as ROUTES from "../../constants/routes";
import {Container} from "react-bootstrap";
import { AuthUserContext } from "../Session";

function handleMobileNav() {
    let mobile_nav = document.getElementsByClassName("header__mobile");
        mobile_nav[0].classList.add("active");
}

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
            <a href={ROUTES.ABOUT} className="header__nav__link">À propos</a>
          </div>
          <div className="header__right-nav">
            <a href={ROUTES.PROPOSE} className="header__nav__link">Proposer une offre</a>
            <div className="header__nav__link dropdown">
                <i className="far fa-user"></i> Mon compte
                <div className="header__nav__dropdown">
                    <a href={ROUTES.ACCOUNT} className="header__nav__dropdown__link">Mon profil</a>
                    {authUser.admin === true && (
                        <div className="header__nav__dropdown__admin">
                          <h6 className="header__nav__dropdown__admin__label">Administration</h6>
                          <a href={ROUTES.USERS} className="header__nav__dropdown__link">Utilisateurs</a>
                          <a href={ROUTES.OFFERS} className="header__nav__dropdown__link">Offres</a>
                        </div>
                    )}
                    <a href={ROUTES.SIGN_OUT} className="header__nav__dropdown__link logout">Déconnexion</a>
                </div>
            </div>
            <nav className="header__socials">
              <a href="https://www.facebook.com/monhimike/" className="header__socials__link facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
              <a href="https://twitter.com/HiMike_App" className="header__socials__link twitter" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
              <a href="https://www.linkedin.com/company/hi-mike/" className="header__socials__link linkedin" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
            </nav>
          </div>
        </div>
        <div className="header__nav-mobile">
            <button className="header__nav-mobile__btn" onClick={handleMobileNav}>
                <i className="fas fa-ellipsis-h"></i>
            </button>
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
