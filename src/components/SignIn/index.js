import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import './index.css';

const SignInPage = () => (
    <Container className="h-100">
        <Row className="h100">
            <Col>
                <h2>Vous n'avez pas de compte ?</h2>
                <h1>Inscrivez-vous</h1>
                <p>
                    Inscris toi sur collaborative Data et gagne des récompenses !

                    Abonnements Netflix, Bein Sports...
                </p>
                <SignUpLink/>
            </Col>
            <Col>
                <div className="divider"></div>
            </Col>
            <Col>
                <h2>Vous avez déjà un compte ?</h2>
                <h1>Connectez-vous</h1>
                <SignInForm/>
                {/*<SignInGoogle />*/}
                {/*<SignInFacebook />*/}
                {/*<SignInTwitter />*/}
                <PasswordForgetLink/>
            </Col>
        </Row>
    </Container>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
    'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
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
        const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Email"
                                  value={email}
                                  onChange={this.onChange}
                                  name="email"
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password"
                                  placeholder="Mot de passe"
                                  value={password}
                                  onChange={this.onChange}
                                  name="password"
                    />
                </Form.Group>
                <Button disabled={isInvalid} type="submit" className="mb-5 btn-custom">
                    <h4>Se connecter</h4>
                </Button>

                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

class SignInGoogleBase extends Component {
    constructor(props) {
        super(props);

        this.state = {error: null};
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.user.displayName,
                    email: socialAuthUser.user.email,
                    roles: [],
                });
            })
            .then(() => {
                this.setState({error: null});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({error});
            });

        event.preventDefault();
    };

    render() {
        const {error} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Google</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInFacebookBase extends Component {
    constructor(props) {
        super(props);

        this.state = {error: null};
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithFacebook()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.additionalUserInfo.profile.name,
                    email: socialAuthUser.additionalUserInfo.profile.email,
                    roles: [],
                });
            })
            .then(() => {
                this.setState({error: null});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({error});
            });

        event.preventDefault();
    };

    render() {
        const {error} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Facebook</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

class SignInTwitterBase extends Component {
    constructor(props) {
        super(props);

        this.state = {error: null};
    }

    onSubmit = event => {
        this.props.firebase
            .doSignInWithTwitter()
            .then(socialAuthUser => {
                // Create a user in your Firebase Realtime Database too
                return this.props.firebase.user(socialAuthUser.user.uid).set({
                    username: socialAuthUser.additionalUserInfo.profile.name,
                    email: socialAuthUser.additionalUserInfo.profile.email,
                    roles: [],
                });
            })
            .then(() => {
                this.setState({error: null});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({error});
            });

        event.preventDefault();
    };

    render() {
        const {error} = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">Sign In with Twitter</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignInLink = () => (
    <Button type="submit" className="mb-5 btn-custom" href={ROUTES.SIGN_IN} >
        <h4>Se connecter</h4>
    </Button>
);

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);


const SignInGoogle = compose(
    withRouter,
    withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
    withRouter,
    withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
    withRouter,
    withFirebase,
)(SignInTwitterBase);

export default SignInPage;

export {SignInForm, SignInGoogle, SignInFacebook, SignInTwitter, SignInLink};
