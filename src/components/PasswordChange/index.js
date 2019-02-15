import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import {Button, Form} from "react-bootstrap";

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Form onSubmit={this.onSubmit}>
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
          <Button disabled={isInvalid} type="submit" className="mb-5 btn-custom">
              Réinitialiser mon mot de passe
          </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
