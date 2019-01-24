import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import Styles from './Styles';
import {compose} from 'recompose';

import {
    AuthUserContext,
} from '../Session';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Mobile from  '../Mobile';

const ProposePage = () => (
    <Styles>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ?
                    authUser.contributor === 'accepted' ? (
                        <div>
                            <h1>Proposer une offre</h1>
                            <ProposeForm authUser={authUser}/>
                        </div>
                    ) : (
                        <h1><Link to={ROUTES.ACCOUNT}>Devenez contributeur pour poster une offre !</Link></h1>
                    )
                : <h1><Link to={ROUTES.SIGN_UP}>Inscrivez-vous pour poster une offre !</Link></h1>
            }
        </AuthUserContext.Consumer>
    </Styles>
);

const INITIAL_STATE = {
    error: ''
};

class ProposeFormBase extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = (values, event) => {
        console.log("on submit"+JSON.stringify(values,0,2));
        console.log(event);
        this.props.firebase.offer().push({
                idUser : this.props.authUser.uid,
                values
            })
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(
                    {
                        pathname : ROUTES.HOME,
                        state : { alert : 'Votre annonce a été enregistrée, elle est en cours de validation par les administrateurs'}
                    });
            })
            .catch(error => {
                console.log(error);
                this.setState({error});
            });
    };

    validate = values => {
        const errors = {};

        if (!values.title) {
            errors.title = "Obligatoire";
        }
        if (!values.offerType) {
            errors.offerType = "Obligatoire";
        }
        if (!values.offerType) {
            errors.offerType = "Obligatoire";
        }
        return errors;
    };

        render() {
        return (
            <Form
                onSubmit={this.onSubmit}
                validate={this.validate}
                initialValues={{
                    title : null,
                    link : null,
                    promo : null,
                    description : null,
                    offerType : "mobile",
                    operator : "free",
                    dataVolume : "20",
                    commitment : "0",
                    phone : "false",
                    calls : "0",
                    foreign : "true"
                }}
                render={({ submitError, handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <h3> 1) Dis-nous en plus sur l'offre :</h3>

                        <Field name="title">
                            {({ input, meta }) => (
                                <div className='row-form'>
                                    <label>Titre *</label>
                                    <input {...input} type="text" placeholder="Titre" />
                                    {(meta.error || meta.submitError) &&
                                    meta.touched && <span className='error'>{meta.error || meta.submitError}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="link">
                            {({ input, meta }) => (
                                <div className='row-form'>
                                    <label>Lien</label>
                                    <input {...input} type="text" placeholder="Lien vers l'offre" />
                                    {(meta.error || meta.submitError) &&
                                    meta.touched && <span className='error'>{meta.error || meta.submitError}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="promo">
                            {({ input, meta }) => (
                                <div className='row-form'>
                                    <label>Code promotionnel</label>
                                    <input {...input} type="text" placeholder="Code promotionnel" />
                                    {(meta.error || meta.submitError) &&
                                    meta.touched && <span className='error'>{meta.error || meta.submitError}</span>}
                                </div>
                            )}
                        </Field>

                        <Field name="description" component="textarea">
                            {({ input, meta }) => (
                                <div className='row-form'>
                                    <label>Description</label>
                                    <textarea {...input} placeholder="Description" />
                                    {(meta.error || meta.submitError) &&
                                    meta.touched && <span className='error'>{meta.error || meta.submitError}</span>}
                                </div>
                            )}
                        </Field>

                        <h3>2) Sélectionne un type d'offre :</h3>

                        <div className='row-form'>
                            <label>Type d'offre *</label>
                            <Field name="offerType" component="select">
                                <option value="mobile" >Mobile</option>
                                <option value="internet">Internet</option>
                                <option value="gas">Gaz</option>
                                <option value="electricity">Électricité</option>
                                <option value="medias">Médias</option>
                            </Field>
                        </div>

                        {console.log(values)}
                        <h3>3) Définis les critères de l'offre :</h3>
                        {values.offerType === 'mobile' &&
                            <Mobile/>
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
