import React, {Component} from 'react';
import "./Propose.scss";
import {Link, withRouter} from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import {compose} from 'recompose';

import {
    AuthUserContext,
} from '../Session';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Mobile from './mobile';
import {Container} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";

const ProposePage = () => (
    <div className="propose">
        <Container>
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser ?
                        authUser.contributor === 'accepted' ? (
                            <div>
                                <h1>Proposer une offre</h1>
                                <ProposeForm authUser={authUser}/>
                            </div>
                        ) : (
                            <h1 className='text-center'><Link to={ROUTES.ACCOUNT}>Devenez contributeur pour poster une offre !</Link></h1>
                        )
                        : <h1 className='text-center'><Link to={ROUTES.SIGN_UP}>Inscrivez-vous pour poster une offre !</Link></h1>
                }
            </AuthUserContext.Consumer>
        </Container>
    </div>
);

const INITIAL_STATE = {
    error: ''
};

class ProposeFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = (values, event) => {
        this.props.firebase.offer().push({
            idUser : this.props.authUser.uid,
            created_at : Date.now(),
            status : "pending",
            ...values
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
        if (!values.price) {
            errors.price = "Obligatoire";
        }
        // const regexPrice = RegExp("(\\d+.*\\d{1,2})");
        // console.log(regexPrice.test(values.price));
        // if(!regexPrice.test(values.price)) {
        //     errors.price = "Veuillez indiquer un prix valable";
        // }
        if (!values.category) {
            errors.category = "Obligatoire";
        }
        return errors;
    };

    render() {
        return (
            <Form
                onSubmit={this.onSubmit}
                validate={this.validate}
                initialValues={{
                    title : "",
                    price : "",
                    link : "",
                    promo : "",
                    description : "",
                    category : "mobile",
                    date_start : "",
                    date_end : "",
                    operator : "Free",
                    dataVolume : "",
                    commitment : "0",
                    phone : "true",
                    calls : "0",
                    foreign : "true"
                }}
                render={({ submitError, handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <h3> 1) Dis-nous en plus sur l'offre :</h3>

                        <Field name="title">
                            {({ input, meta }) => (
                                <div className='form-group'>
                                    <label>Titre *
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="text" placeholder="Titre" className="form-control" />

                                </div>
                            )}
                        </Field>

                        <Field name="price">
                            {({ input, meta }) => (
                                <div className='form-group'>
                                    <label>Prix  *
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="text" placeholder="Prix" className="form-control" />
                                </div>
                            )}
                        </Field>

                        <Field name="link">
                            {({ input, meta }) => (
                                <div className='form-group'>
                                    <label>Lien
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="text" placeholder="Lien" className="form-control" />
                                </div>
                            )}
                        </Field>

                        <Field name="promo">
                            {({ input, meta }) => (
                                <div className='form-group'>
                                    <label>Code promotionnel
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="text" placeholder="Code promotionnel" className="form-control" />
                                </div>
                            )}
                        </Field>

                        <Field name="description" component="textarea">
                            {({ input, meta }) => (
                                <div className='form-group'>
                                    <label>Description
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <textarea {...input} placeholder="Description" className="form-control" />
                                </div>
                            )}
                        </Field>

                        <Field name="date_start">
                            {({ input, meta }) => (
                                <div className='form-group'>
                                    <label>Date de début
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="date" placeholder="Date de début "
                                           className="form-control" />
                                </div>
                            )}
                        </Field>

                        <Field name="date_end">
                            {({ input, meta }) => (
                                <div className='form-group'>
                                    <label>Date de fin
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="date" placeholder="Date de fin"
                                           className="form-control" />
                                </div>
                            )}
                        </Field>

                        <h3>2) Sélectionne un type d'offre :</h3>

                        <div className='form-group'>
                            <label>Type d'offre *</label>
                            <Field name="category" component="select" className="form-control">
                                <option value="mobile" >Mobile</option>
                                <option value="internet">Internet</option>
                                <option value="gas">Gaz</option>
                                <option value="electricity">Électricité</option>
                                <option value="medias">Médias</option>
                            </Field>
                        </div>

                        <h3>3) Définis les critères de l'offre :</h3>
                        {values.category === 'mobile' &&
                        <Mobile/>
                        }
                        <p>Les champs obligatoires sont signalés par un astérix</p>

                        {submitError && <div className="error">{submitError}</div>}
                        <div className="buttons">
                            <Button type="submit" disabled={submitting} className="mb-5 btn-custom">
                                Valider
                            </Button>
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
