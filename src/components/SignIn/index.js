import React, {Component} from 'react';
import "./Signin.scss";
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Button, Container, Form} from "react-bootstrap";

const SignInPage = () => (
    <div className="signin">
      <Container>
        <div className="signin__content">
          <div className="signin__left signin__register">
            <div className="signin__content__title">Vous n'avez pas de compte ?<br/><strong>Inscrivez-vous</strong></div>
            <div className="signin__register__text">
                <p>Partage tes offres avec collaborative-data avec le hastag <strong>#himike</strong> sur les réseaux sociaux ou deviens contributeur et gagne des tokens sur tous les sites du réseau HiMike.</p>
                <p>Pour vous inscrire, il suffit de cliquer sur le bouton ci-dessous et de remplir le formulaire sur la page suivante. Une fois votre compte validé, un mail vous sera envoyé pour valider votre  compte et vous pourrez commencer à cumuler des points.</p>
            </div>
            <div>
                <a href={ROUTES.SIGN_UP} className="signin__register__btn">Je créer mon compte</a>
            </div>
          </div>
          <div className="signin__right signin__form">
            <div className="signin__content__title">Vous avez déjà un compte ?<br/><strong>Connectez-vous</strong></div>
            <SignInForm/>
          </div>
        </div>
      </Container>
    </div>
    // <Container className="h-100">
    //     <Row className="h100">
    //         <Col>
    //             <h2>Vous n'avez pas de compte ?</h2>
    //             <h1>Inscrivez-vous</h1>
    //             <p>
    //                 Inscris toi sur collaborative Data et gagne des récompenses !
    //
    //                 Abonnements Netflix, Bein Sports...
    //             </p>
    //             <SignUpLink/>
    //         </Col>
    //         <Col>
    //             <div className="divider"></div>
    //         </Col>
    //         <Col>
    //             <h2>Vous avez déjà un compte ?</h2>
    //             <h1>Connectez-vous</h1>
    //             <SignInForm/>
    //             {/*<SignInGoogle />*/}
    //             {/*<SignInFacebook />*/}
    //             {/*<SignInTwitter />*/}
    //             <PasswordForgetLink/>
    //         </Col>
    //     </Row>
    // </Container>
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
                    <Form.Label className="signin__form__label">Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={this.onChange} name="email"  className="signin__form__input" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="signin__form__label">Mot de passe <a href={ROUTES.PASSWORD_FORGET} className="signin__form__link">Mot de passe oublié ?</a></Form.Label>
                    <Form.Control type="password" value={password} onChange={this.onChange} name="password" className="signin__form__input" />
                </Form.Group>

                <div className="signin__form__error">
                  {error && error.message}
                </div>

                <Button disabled={isInvalid} type="submit" className="signin__form__btn">Se connecter</Button>

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
