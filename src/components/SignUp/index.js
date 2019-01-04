import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div>
        <h1>Se créer un compte</h1>
        <SignUpForm/>
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
            admin,
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
                    placeholder="Email"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Mot de passe"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirmation du mot de passe"
                />
                <label>
                    Admin:
                    <input
                        name="admin"
                        type="checkbox"
                        checked={admin}
                        onChange={this.onChangeCheckbox}
                    />
                </label>
                <button disabled={isInvalid} type="submit">
                    Se créer un compte
                </button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Pas encore de compte ? <Link to={ROUTES.SIGN_UP}>Se créer un compte</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};
