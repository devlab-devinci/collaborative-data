import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    isUsernameTaken : false,
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page. 
`;

const ERROR_MSG_USERNAME_EXISTS = `
 Ce pseudo est déjà utilisé
`;

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {...INITIAL_STATE};
    }

    // TODO : séparer la validation du formulaire en 2, une fois que les champs sont tous bons alors faire le call firebase
    onSubmit = event => {
        const {username, isUsernameTaken, email, passwordOne, isAdmin} = this.state;

        const roles = [];

        if (isAdmin) {
            roles.push(ROLES.ADMIN);
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    roles,
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
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                } else if (error.code === ERROR_MSG_USERNAME_EXISTS) {
                    error.message = ERROR_MSG_USERNAME_EXISTS;
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
            isAdmin,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === ''
            ;

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChangeUsername}
                    type="text"
                    placeholder="Pseudo"
                />
                {/*{console.log(isUsernameTaken)}*/}
                {/*{console.log(username)}*/}
                {(isUsernameTaken === true) && username !==''
                    ?<p>Ce pseudo est déjà utilisé</p>
                    : null
                }
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <label>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </label>
                <button disabled={isInvalid} type="submit">
                    Sign Up
                </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};
