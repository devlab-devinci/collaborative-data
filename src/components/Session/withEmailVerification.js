import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import Container from "react-bootstrap/es/Container";
import Button from "react-bootstrap/es/Button";

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <Container>
                {this.state.isSent ? (
                  <h2>
                    Email de confirmation envoyé, merci de confirmer votre mail puis rafraîchir cette page
                    une fois que votre adresse mail est confirmée
                  </h2>
                ) : (
                  <h2>
                    Un e-mail de confirmation vous a été envoyé.
                    Cliquez sur le bouton en dessous si vous n'avez pas reçu de mail.
                  </h2>
                )}

                <Button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Envoyer un e-mail de confirmation
                </Button>
              </Container>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
