import React from "react";
import "./Header.scss";

import * as ROUTES from "../../constants/routes";
import {Container} from "react-bootstrap";
import { AuthUserContext } from "../Session";

function closeMobileNav() {
    let mobile_nav = document.getElementsByClassName("header__mobile");
        mobile_nav[0].classList.remove("active");
}

const HeaderMobile = () => (
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
    <div className="header__mobile">
        <div className="header__mobile__close" onClick={closeMobileNav}><i className="fas fa-times"></i></div>
        <Container>
            <div className="header__mobile__content">
                <nav className="header__mobile__nav">
                    <a href={ROUTES.HOME} className="header__mobile__nav__link">Accueil</a>
                    <a href="javascript:void()" className="header__mobile__nav__link">À propos</a>
                    <a href={ROUTES.PROPOSE} className="header__mobile__nav__link">Proposer une offre</a>
                    <a href={ROUTES.ACCOUNT} className="header__mobile__nav__link">Mon profil</a>
                    <a href={ROUTES.ACCOUNT} className="header__mobile__nav__link">Mes contributions</a>
                    <a href={ROUTES.SIGN_OUT} className="header__mobile__nav__link">Déconnexion</a>
                    {authUser.admin === true && (
                        <div className="header__mobile__nav__admin">
                          <h6 className="header__mobile__nav__admin__label">Administration</h6>
                          <a href={ROUTES.USERS} className="header__mobile__nav__link">Utilisateurs</a>
                          <a href={ROUTES.OFFERS} className="header__mobile__nav__link">Offres</a>
                        </div>
                    )}
                </nav>
                <nav className="header__mobile__socials">
                  <a href="https://www.facebook.com/monhimike/" className="header__mobile__socials__link facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                  <a href="https://twitter.com/HiMike_App" className="header__mobile__socials__link twitter" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                  <a href="https://www.linkedin.com/company/hi-mike/" className="header__mobile__socials__link linkedin" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                </nav>
            </div>
        </Container>
    </div>
);

const NavigationNonAuth = () => (
    <div className="header__mobile">
        <Container>
            <div className="header__mobile__content">
                <nav className="header__mobile__nav">
                    <a href={ROUTES.HOME} className="header__mobile__nav__link">Accueil</a>
                    <a href="javascript:void()" className="header__mobile__nav__link">À propos</a>
                    <a href={ROUTES.PROPOSE} className="header__mobile__nav__link">Proposer une offre</a>
                </nav>
                <nav className="header__mobile__socials">
                  <a href="https://www.facebook.com/monhimike/" className="header__mobile__socials__link facebook" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                  <a href="https://twitter.com/HiMike_App" className="header__mobile__socials__link twitter" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                  <a href="https://www.linkedin.com/company/hi-mike/" className="header__mobile__socials__link linkedin" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                </nav>
            </div>
        </Container>
    </div>
);

export default HeaderMobile;
