import React, {Component} from 'react';
import "./Signup.scss";

import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const SignUpPage = () => (
    <div className="signup">
      <Container>
        <div className="signup__content">
          <div className="signup__left signup__login">
            <div className="signup__content__title first"><strong>Pourquoi s'inscrire ?</strong></div>
            <div className="signup__login__text">
                <p>En vous inscrivant, vous rejoignez la communauté de collaborative data. Ainsi en participant à la vie du site, vous gagner des tokens à utiliser pour vous offrir un abonnement sur les platformes en partenariat avec HiMike.</p>
                <strong>Comment ça marche ?</strong>
            </div>
            <div className="signup__login__cta">
                <div className="signup__content__title center">Vous avez déjà un compte ? <br/><strong>Connectez-vous</strong></div>
                <a href={ROUTES.SIGN_IN} className="signin__register__btn">Je me connecte</a>
            </div>
          </div>
          <div className="signup__right signup_form">
            <div className="signup__content__title">Vous n'avez pas de compte ?<br/><strong>Inscrivez-vous avec le formulaire ci-dessous</strong></div>
            <SignUpForm/>
          </div>
        </div>
      </Container>
    </div>
);

const INITIAL_STATE = {
    username: '',
    isUsernameTaken : false,
    email: '',
    passwordOne: '',
    passwordTwo: '',
    admin : false,
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  Un compte utilisant cette adresse mail existe déjà
`;

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {username, email, passwordOne, admin} = this.state;

        let contributor;
        if(admin) {
            contributor = "accepted";
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    admin,
                    contributor
                });
            })
            .then(() => {
                return this.props.firebase.doSendEmailVerification();
            })
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                console.log(error);
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({error});
            });

        event.preventDefault();
    };

    onChangeUsername = event => {
        this.setState({[event.target.name]: event.target.value});
        this.props.firebase.db.ref().child('users').orderByChild('username').equalTo(event.target.value).on('value', (snapshot) => {
            this.setState({isUsernameTaken : snapshot.exists()});
        });
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    onChangeCheckbox = event => {
        this.setState({[event.target.name]: event.target.checked});
    };

    render() {
        const {
            username,
            isUsernameTaken,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === ''
            ;

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label className="signup__form__label">Identifiant</Form.Label>
                    <Form.Control type="text" value={username} onChange={this.onChangeUsername} name="username" className="signup__form__input" />
                </Form.Group>

                <div className="signup__form__error">
                {(isUsernameTaken === true) && username !==''
                    ?<p className="text-warning">Ce pseudo est déjà utilisé</p>
                    : null
                }
                </div>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="signup__form__label">Adresse email</Form.Label>
                            <Form.Control type="text" value={email} onChange={this.onChange} name="email" className="signup__form__input" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formBasicEmailTwo">
                            <Form.Label className="signup__form__label">Confirmer votre adresse email</Form.Label>
                            <Form.Control type="text" value={email} onChange={this.onChange} name="email" className="signup__form__input" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formBasicPasswordOne">
                            <Form.Label className="signup__form__label">Mot de passe</Form.Label>
                            <Form.Control type="password" value={passwordOne} onChange={this.onChange} name="password" className="signup__form__input" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formBasicPasswordTwo">
                            <Form.Label className="signup__form__label">Confirmation du mot de passe</Form.Label>
                            <Form.Control type="password" value={passwordTwo} onChange={this.onChange} name="password" className="signup__form__input" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group>
                    <Form.Check type="checkbox" name="terms" className="signup__form__checkbox" label="J'accepte les conditions générales d'utilisation et la politique de confidentialité" />
                </Form.Group>

                <Button disabled={isInvalid} type="submit" className="signup__form__btn">Je m'inscris</Button>

                <div className="signup__form__error">
                    {error && <p>{error.message}</p>}
                </div>
            </Form>
        );
    }
}

const SignUpLink = () => (
    <Button type="submit" className="mb-5" href={ROUTES.SIGN_UP} >
        <h4>Créer un compte</h4>
    </Button>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};
