import React, { Component } from 'react';
import "./PasswordChange.scss";

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
              <Form.Label className="pw-change__form__label">Mot de passe</Form.Label>
              <Form.Control type="password" value={passwordOne} onChange={this.onChange} name="password" className="pw-change__form__input" />
          </Form.Group>

          <Form.Group controlId="formBasicPasswordTwo">
              <Form.Label className="pw-change__form__label">Confirmation du mot de passe</Form.Label>
              <Form.Control type="password" value={passwordTwo} onChange={this.onChange} name="password" className="pw-change__form__input" />
          </Form.Group>

          <Button disabled={isInvalid} type="submit" className="pw-change__form__btn">
              Réinitialiser mon mot de passe
          </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
