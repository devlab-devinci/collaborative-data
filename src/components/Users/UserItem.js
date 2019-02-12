import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Button from "react-bootstrap/es/Button";

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>Utilisateur ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
              <p><strong>Username : </strong>{user.username}</p>
              <p><strong>Email: </strong>{user.email}</p>
              <p><strong>Contributeur: </strong>{user.contributor}</p>
              <Button
                type="button"
                onClick={this.onSendPasswordResetEmail}
                className="ml-1"
              >
                Mise à zéro de l'email
              </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(UserItem);
