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

  acceptContributor = () => {
      this.props.firebase.user(this.state.user.uid).update({
          contributor : "accepted",
      }).then(() => {
          this.setState({user : {...this.state.user, contributor: "accepted"}});
      })
  };

  refuseContributor = () => {
      this.props.firebase.user(this.state.user.uid).update({
          contributor : "refused",
      }).then(() => {
          this.setState({user : {...this.state.user, contributor: "refused"}});
      })
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
              <p><strong>Email: </strong>{user.email}
                  <Button
                      type="button"
                      onClick={this.onSendPasswordResetEmail}
                      className="ml-1 btn-custom"
                  >
                      Mise à zéro de l'email
                  </Button>
              </p>
              <p><strong>Contributeur: </strong>
                  {user.contributor === "" ?
                    "Aucune demande"
                    :
                    user.contributor
                  }
              </p>
              {user.contributor !== "accepted" ?
                  <Button
                      type="button"
                      onClick={this.acceptContributor}
                      className="ml-1 btn-success"
                  >
                    Accepter le statut de contributeur
                  </Button>
                  :
                  <Button
                      type="button"
                      onClick={this.refuseContributor}
                      className="ml-1 btn-danger"
                  >
                    Refuser le statut de contributeur
                  </Button>
              }
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(UserItem);
