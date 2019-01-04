import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
} from '../Session';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Mobile from  '../Mobile';

const ProposePage = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser.contributor === 'accepted' ? (
                <div>
                    <h1>Proposer une offre</h1>
                    <ProposeForm authUser={authUser}/>
                </div>
            ) : (
                <h1><Link to={ROUTES.ACCOUNT}>Devenez contributeur pour poster une offre !</Link></h1>
            )
        }
    </AuthUserContext.Consumer>
);

const INITIAL_STATE = {
    offerType : 'Mobile',
    selectedFields : {},
    error: ''
};

class ProposeFormBase extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {username, email, passwordOne, admin} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    email,
                    admin,
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
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({offerType : event.target.value});
        console.log(this.state.offerType);
    };

    render() {
        const { offerType , selectedFields ,error } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <label>
                    1) Sélectionnez un type d'offre à proposer :
                    <select value={offerType} onChange={this.onChange}>
                        <option value="Mobile">Mobile</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                {offerType === 'Mobile' &&
                    <Mobile/>
                }
                {Object.keys(selectedFields).length !== 0 &&
                    <button type="submit">
                        Valider
                    </button>
                }
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const ProposeForm = compose(
    withRouter,
    withFirebase,
)(ProposeFormBase);

export default ProposePage;

export {ProposeForm};
