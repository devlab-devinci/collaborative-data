import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {SignInLink} from "../SignIn";

const SignUpPage = () => (
    <Container>
        <Row>
            <Col>
                <h1>Pourquoi s'inscrire ?</h1>
                <p>
                    Inscris toi sur collaborative Data et gagne des récompenses !

                    Abonnements Netflix, Bein Sports...
                </p>
                <SignInLink/>
            </Col>
            <Col>
                <div className="divider"></div>
            </Col>
            <Col>
                <h2>Vous n'avez pas encore de compte ?</h2>
                <h1>Inscrivez-vous</h1>
                <SignUpForm/>
            </Col>
        </Row>
    </Container>
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
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Pseudo"
                                  value={username}
                                  onChange={this.onChangeUsername}
                                  name="username"
                    />
                </Form.Group>

                {/*{console.log(isUsernameTaken)}*/}
                {/*{console.log(username)}*/}
                {(isUsernameTaken === true) && username !==''
                    ?<p className="text-warning">Ce pseudo est déjà utilisé</p>
                    : null
                }

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Email"
                                  value={email}
                                  onChange={this.onChange}
                                  name="email"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPasswordOne">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password"
                                  placeholder="Mot de passe"
                                  value={passwordOne}
                                  onChange={this.onChange}
                                  name="password"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPasswordTwo">
                    <Form.Label>Confirmation du mot de passe</Form.Label>
                    <Form.Control type="password"
                                  placeholder="Confirmation du mot de passe"
                                  value={passwordTwo}
                                  onChange={this.onChange}
                                  name="password"
                    />
                </Form.Group>

                <Button disabled={isInvalid} type="submit" className="mb-5">
                    <h4>Se créer un compte</h4>
                </Button>
                {error && <p>{error.message}</p>}
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
