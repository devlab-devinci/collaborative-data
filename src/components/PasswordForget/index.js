import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";

const PasswordForgetPage = () => (
    <Container>
        <h1 className="text-center">Mot de passe oublié</h1>
        <PasswordForgetForm/>
    </Container>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email} = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
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
        const {email, error} = this.state;

        const isInvalid = email === '';

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Email"
                                  value={this.state.email}
                                  onChange={this.onChange}
                                  name="email"
                    />
                </Form.Group>
                <Button disabled={isInvalid} type="submit" className="mb-5 btn-custom">
                    Réinitialiser mon email
                </Button>

                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Mot de passe oublié ?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink};
