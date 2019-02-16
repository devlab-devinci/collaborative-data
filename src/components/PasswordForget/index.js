import React, {Component} from 'react';
import './PasswordForget.scss';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";

const PasswordForgetPage = () => (
    <div className="pw-forget">
      <Container>
          <div className="pw-forget__content">
              <div className="pw-forget__left">
                  <div className="pw-forget__instructions">
                      En remplissant ce formulaire, vous recevrez un email avec un lien pour réinitialiser votre mot de passe. Veuillez cliquer dans le lien sur cet email.
                  </div>
                  <div className="pw-forget__login__cta">
                      <div className="signup__content__title center">Vous avez déjà un compte ? <br/><strong>Connectez-vous</strong></div>
                      <a href={ROUTES.SIGN_IN} className="signin__register__btn">Je me connecte</a>
                  </div>
              </div>
              <div className="pw-forget__right">
                  <div className="pw-forget__content__title">Vous avez oublier votre mot de passe ? <br/><strong>Réinitialiser le à l'aide du formulaire ci-dessous</strong></div>
                  <PasswordForgetForm/>
              </div>
          </div>
      </Container>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email} = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, error} = this.state;

        const isInvalid = email === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="pw-forget__form__label">Votre adresse email</Form.Label>
                    <Form.Control type="text"  value={this.state.email} onChange={this.onChange} name="email" className="pw-forget__form__input" />
                </Form.Group>
                <Button disabled={isInvalid} type="submit" className="pw-forget__form__btn">
                    Réinitialiser mon email
                </Button>

                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm};
