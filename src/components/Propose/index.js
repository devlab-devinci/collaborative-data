import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Styles from './Styles';
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
    <Styles>
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
    </Styles>
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

    onSubmit(values) {
        console.log( values);
        return event => {
            console.log( event);
            // if (values.username !== "erikras") {
            //     return { username: "Unknown username" };
            // }
            // if (values.password !== "finalformrocks") {
            //     return { [FORM_ERROR]: "Login Failed" };
            // }
            // window.alert("LOGIN SUCCESS!");
            // const {username, email, passwordOne, admin} = this.state;

            // this.props.firebase
            //     .doCreateUserWithEmailAndPassword(email, passwordOne)
            //     .then(authUser => {
            //         // Create a user in your Firebase realtime database
            //         return this.props.firebase.user(authUser.user.uid).set({
            //             username,
            //             email,
            //             admin,
            //         });
            //     })
            //     .then(() => {
            //         return this.props.firebase.doSendEmailVerification();
            //     })
            //     .then(() => {
            //         this.setState({...INITIAL_STATE});
            //         this.props.history.push(ROUTES.HOME);
            //     })
            //     .catch(error => {
            //         console.log(error);
            //         this.setState({error});
            //     });
            event.preventDefault();
        };
    }

    onChange = event => {
        this.setState({offerType: event.target.value});
        console.log(this.state.offerType);
    };

    render() {
        const {offerType, selectedFields, error} = this.state;

        return (
            <Form
                onSubmit={this.onSubmit}
                validate={values => {
                    const errors = {};
                    if (!values.title) {
                        errors.title = "Obligatoire";
                    }
                    if (!values.link) {
                    }
                    if (!values.age) {
                        errors.age = "Required";
                    } else if (isNaN(values.age)) {
                        errors.age = "Must be a number";
                    } else if (values.age < 18) {
                        errors.age = "No kids allowed";
                    }
                    return errors;
                }}
                render={({ submitError, handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <h3> 1) Dis-nous en plus sur l'offre :</h3>
                        <Field name="title">
                            {({ input, meta }) => (
                                <div>
                                    <label>Titre *</label>
                                    <input {...input} type="text" placeholder="Titre" />
                                    {(meta.error || meta.submitError) &&
                                    meta.touched && <span>{meta.error || meta.submitError}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="link">
                            {({ input, meta }) => (
                                <div>
                                    <label>Lien</label>
                                    <input {...input} type="text" placeholder="Lien vers l'offre" />
                                    {(meta.error || meta.submitError) &&
                                    meta.touched && <span>{meta.error || meta.submitError}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="promo">
                            {({ input, meta }) => (
                                <div>
                                    <label>Code promotionnel</label>
                                    <input {...input} type="text" placeholder="Code promotionnel" />
                                    {(meta.error || meta.submitError) &&
                                    meta.touched && <span>{meta.error || meta.submitError}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="description" component="textarea">
                            {({ textarea, meta }) => (
                                <div>
                                    <label>Description</label>
                                    <textarea {...textarea} type="text" placeholder="Description" />
                                    {(meta.error || meta.submitError) &&
                                    meta.touched && <span>{meta.error || meta.submitError}</span>}
                                </div>
                            )}
                        </Field>

                        <h3>2) Sélectionne un type d'offre :</h3>
                            <select value={offerType} onChange={this.onChange}>
                                <option value="Mobile">Mobile</option>
                                <option value="lime">Lime</option>
                                <option value="coconut">Coconut</option>
                                <option value="mango">Mango</option>
                            </select>

                        {offerType === 'Mobile' &&
                            <h3>3) Définis les critères de l'offre :</h3>
                        }
                        <p>Les champs obligatoires sont signalés par un astérix</p>

                        {submitError && <div className="error">{submitError}</div>}
                        <div className="buttons">
                            <button
                                type="button"
                                onClick={reset}
                                disabled={submitting || pristine}
                            >
                                Reset
                            </button>
                            <button type="submit" disabled={submitting}>
                                Valider
                            </button>
                        </div>
                    </form>
                )}
            />
        )
    }
}

const ProposeForm = compose(
    withRouter,
    withFirebase,
)(ProposeFormBase);

export default ProposePage;

export {ProposeForm};
