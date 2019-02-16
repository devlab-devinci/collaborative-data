import React, { Component } from "react";
import "./Footer.scss";

import * as ROUTES from "../../constants/routes";
import { Container } from "react-bootstrap";

class Footer extends Component {

  constructor(props) {
      super(props);
      this.state = {
        minified: false
      }
  }

  componentDidMount() {
    let currentRoute = this.props.history.location.pathname;
    if (currentRoute === ROUTES.SIGN_IN || currentRoute === ROUTES.SIGN_UP || currentRoute === ROUTES.PASSWORD_FORGET) {
        this.setState({
          minified: true
        });
    }
  }

  render() {
    let {minified} = this.state;
    return (
      <footer className={ minified ? "footer no-margin" : "footer" }>
        <Container>
          {!minified && (
            <div className="footer__top">
                <nav className="footer__socials">
                    <a href="https://www.facebook.com/monhimike/" className="footer__socials__link"><i className="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/HiMike_App" className="footer__socials__link"><i className="fab fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/company/hi-mike/" className="footer__socials__link"><i className="fab fa-linkedin"></i></a>
                    <a href="mailto:contact@himike.fr" className="footer__socials__link"><i className="fas fa-envelope"></i></a>
                </nav>
            </div>
          )}
          <div className="footer__bottom">
              <div className="footer__bottom__subrow">
                  <span className="footer__bottom__copyright">2019 &copy; Tous droits réservés.</span>
                  <p className="footer__bottom__content">Collaborative Data</p>
                  <nav className="footer__bottom__nav">
                      <a href={ROUTES.PRIVACY} className="footer__bottom__nav__link">Politique de confidentialité</a>
                      <a href={ROUTES.TERMS} className="footer__bottom__nav__link">Mentions légales</a>
                  </nav>
              </div>
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
