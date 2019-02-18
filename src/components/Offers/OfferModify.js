import React, {Component} from "react";

import {withFirebase} from "../Firebase";
import Button from "react-bootstrap/es/Button";
import * as ROUTES from "../../constants/routes";
import {Link, withRouter} from "react-router-dom";
import {Field, Form} from "react-final-form";
import Mobile from "../Propose/mobile";
import {Container} from "react-bootstrap";
import AuthUserContext from "../Session/context";
import {compose} from "recompose";

const OfferModifyPage = () => (
    <Container>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ?
                    authUser.contributor === 'accepted' ? (
                        <div>
                            <h1>Modifier l'offre</h1>
                            <OfferModifyForm authUser={authUser}/>
                        </div>
                    ) : (
                        <h1 className='text-center'><Link to={ROUTES.ACCOUNT}>Devenez contributeur pour poster une offre
                            !</Link></h1>
                    )
                    :
                    <h1 className='text-center'><Link to={ROUTES.SIGN_UP}>Inscrivez-vous pour poster une offre !</Link>
                    </h1>
            }
        </AuthUserContext.Consumer>
    </Container>
);

class OfferModifyBase extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            loading: false,
            offer: null,
            ...props.location.state,
        };
    }

    componentDidMount() {
        if (this.state.offer) {
            return;
        }

        this.setState({loading: true});

        this.props.firebase
            .offer(this.props.match.params.id)
            .on("value", snapshot => {
                this.setState({
                    offer: snapshot.val(),
                    loading: false,
                });
            });
    }

    onSubmit = (values, event) => {
        this.props.firebase.offerId(this.props.match.params.id).update({
            ...values
        })
            .then(() => {
                this.props.history.push(
                    {
                        pathname: ROUTES.OFFERS
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
        if (!values.category) {
            errors.category = "Obligatoire";
        }
        return errors;
    };

    render() {
        const {offer, loading} = this.state;

        return (
            <Form
                onSubmit={this.onSubmit}
                validate={this.validate}
                initialValues={{
                    ...offer
                }}
                render={({submitError, handleSubmit, reset, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <h3> 1) Dis-nous en plus sur l'offre :</h3>

                        <Field name="title">
                            {({input, meta}) => (
                                <div className='form-group'>
                                    <label>Titre *
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="text" placeholder="Titre" className="form-control"/>

                                </div>
                            )}
                        </Field>

                        <Field name="price">
                            {({input, meta}) => (
                                <div className='form-group'>
                                    <label>Prix *
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="text" placeholder="Prix" className="form-control"/>
                                </div>
                            )}
                        </Field>

                        <Field name="link">
                            {({input, meta}) => (
                                <div className='form-group'>
                                    <label>Lien
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="text" placeholder="Lien" className="form-control"/>
                                </div>
                            )}
                        </Field>

                        <Field name="promo">
                            {({input, meta}) => (
                                <div className='form-group'>
                                    <label>Code promotionnel
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="text" placeholder="Code promotionnel"
                                           className="form-control"/>
                                </div>
                            )}
                        </Field>

                        <Field name="description" component="textarea">
                            {({input, meta}) => (
                                <div className='form-group'>
                                    <label>Description
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <textarea {...input} placeholder="Description" className="form-control"/>
                                </div>
                            )}
                        </Field>

                        <Field name="date_start">
                            {({input, meta}) => (
                                <div className='form-group'>
                                    <label>Date de début
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="date" placeholder="Date de début "
                                           className="form-control"/>
                                </div>
                            )}
                        </Field>

                        <Field name="date_end">
                            {({input, meta}) => (
                                <div className='form-group'>
                                    <label>Date de fin
                                        {(meta.error || meta.submitError) && meta.touched &&
                                        <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                                    </label>
                                    <input {...input} type="date" placeholder="Date de fin"
                                           className="form-control"/>
                                </div>
                            )}
                        </Field>

                        <h3>2) Sélectionne un type d'offre :</h3>

                        <div className='form-group'>
                            <label>Type d'offre *</label>
                            <Field name="category" component="select" className="form-control">
                                <option value="mobile">Mobile</option>
                                <option value="internet">Internet</option>
                                <option value="gas">Gaz</option>
                                <option value="electricity">Électricité</option>
                                <option value="medias">Médias</option>
                            </Field>
                        </div>

                        <h3>3) Définis les critères de l'offre :</h3>
                        {values.category === "mobile" &&
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
        );
    }
}

const OfferModifyForm = compose(
    withFirebase,
    withRouter,
)(OfferModifyBase);

export {OfferModifyForm}

export default OfferModifyPage;
