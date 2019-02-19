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
import {Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";

const ProposePage = () => (
    <div className="propose">
        <Container>
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser ?
                        authUser.contributor === 'accepted' ? (
                            <div className="propose__content">
                                <h1 className="propose__content__title">Proposer une offre</h1>
                                <ProposeForm authUser={authUser}/>
                            </div>
                        ) : (
                          <div className="propose__content">
                              <h1 className='propose__content__title-center'><Link to={ROUTES.ACCOUNT}>Devenez contributeur pour poster une offre !</Link></h1>
                          </div>
                        ) : (
                          <div className="propose__content">
                              <h1 className='text-propose__content__title'><Link to={ROUTES.SIGN_UP}>Inscrivez-vous pour poster une offre !</Link></h1>
                          </div>
                        )
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
                    operator : "",
                    dataVolume : "",
                    commitment : "0",
                    phone : "true",
                    calls : "0",
                    foreign : "true"
                }}
                render={({ submitError, handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} className="propose__form">

                        <div className="propose__form__content">
                            <div className="propose__form__section">
                                <h3 className="propose__form__section__title">Dite-nous en plus sur l'offre</h3>

                                <Row>
                                    <Field name="title">
                                        {({ input, meta }) => (
                                            <div className="col-md-6 form-group">
                                                <label className="propose__form__label">Titre *</label>
                                                <input {...input} type="text" className="propose__form__input" />
                                                { (meta.error || meta.submitError) && meta.touched && <span className="propose__form__error">{meta.error || meta.submitError}</span> }
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="price">
                                        {({ input, meta }) => (
                                            <div className="col-md-6 form-group">
                                                <label className="propose__form__label">Prix *</label>
                                                <input {...input} type="text" className="propose__form__input" />
                                                { (meta.error || meta.submitError) && meta.touched && <span className="propose__form__error">{meta.error || meta.submitError}</span> }
                                            </div>
                                        )}
                                    </Field>
                                </Row>

                                <Row>
                                    <Field name="date_start">
                                        {({ input, meta }) => (
                                            <div className="col-md-6 form-group">
                                                <label className="propose__form__label">Date de début</label>
                                                <input {...input} type="date" className="propose__form__input" />
                                                { (meta.error || meta.submitError) && meta.touched && <span className="propose__form__error">{meta.error || meta.submitError}</span> }
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="date_end">
                                        {({ input, meta }) => (
                                            <div className="col-md-6 form-group">
                                                <label className="propose__form__label">Date de fin</label>
                                                <input {...input} type="date" className="propose__form__input" />
                                                { (meta.error || meta.submitError) && meta.touched && <span className="propose__form__error">{meta.error || meta.submitError}</span> }
                                            </div>
                                        )}
                                    </Field>
                                </Row>

                                <Row>
                                    <Field name="link">
                                        {({ input, meta }) => (
                                            <div className="col-md-6 form-group">
                                                <label className="propose__form__label">Lien</label>
                                                <input {...input} type="text" className="propose__form__input" />
                                                { (meta.error || meta.submitError) && meta.touched && <span className="propose__form__error">{meta.error || meta.submitError}</span> }
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="promo">
                                        {({ input, meta }) => (
                                            <div className="col-md-6 form-group">
                                                <label className="propose__form__label">Code promotionnel</label>
                                                <input {...input} type="text" className="propose__form__input" />

                                            </div>
                                        )}
                                    </Field>
                                </Row>

                                <Field name="description" component="textarea">
                                    {({ input, meta }) => (
                                        <div className='form-group'>
                                            <label className="propose__form__label">Description</label>
                                            <textarea {...input} className="propose__form__textarea" />
                                            { (meta.error || meta.submitError) && meta.touched && <span className="propose__form__error">{meta.error || meta.submitError}</span> }
                                        </div>
                                    )}
                                </Field>

                            </div>

                            <p className="propose__form__required__label">Les champs obligatoires sont signalés par un astérix</p>

                            {submitError && <div className="propose__form__error">{submitError}</div>}

                            <Button type="submit" disabled={submitting} className="propose__form__btn">
                                Sauvegarder
                            </Button>
                        </div>

                        <div className="propose__form__sidebar">
                            <div className="propose__form__section">
                                <h3 className="propose__form__section__title">Sélectionne un type d'offre</h3>
                                <div className='form-group'>
                                    <label className="propose__form__label">Type d'offre *</label>
                                    <Field name="category" component="select" className="form-control">
                                        <option value="mobile" >Mobile</option>
                                        <option value="internet">Internet</option>
                                        <option value="gas">Gaz</option>
                                        <option value="electricity">Électricité</option>
                                        <option value="medias">Médias</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="propose__form__section">
                                <h3 className="propose__form__section__title">Définis les critères de l'offre</h3>
                                { values.category === 'mobile' && <Mobile/> }
                            </div>

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
