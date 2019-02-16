import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Button from "react-bootstrap/es/Button";

class OfferItem extends Component {
  constructor(props) {
    super(props);
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

    this.setState({ loading: true });

    this.props.firebase
      .offer(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          offer: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.offer(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.offer.email);
  };

  acceptContributor = () => {
      this.props.firebase.offer(this.state.offer.uid).update({
          contributor : "accepted",
      }).then(() => {
          this.setState({offer : {...this.state.offer, contributor: "accepted"}});
      })
  };

  refuseContributor = () => {
      this.props.firebase.offer(this.state.offer.uid).update({
          contributor : "refused",
      }).then(() => {
          this.setState({offer : {...this.state.offer, contributor: "refused"}});
      })
  };

  render() {
    const { offer, loading } = this.state;

    return (
      <div>
        <h2>Utilisateur ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {offer && (
          <div>
              <p><strong>offername : </strong>{offer.offername}</p>
              <p><strong>Email: </strong>{offer.email}
                  <Button
                      type="button"
                      onClick={this.onSendPasswordResetEmail}
                      className="ml-1 btn-custom"
                  >
                      Mise à zéro de l'email
                  </Button>
              </p>
              <p><strong>Contributeur: </strong>
                  {offer.contributor === "" ?
                    "Aucune demande"
                    :
                    offer.contributor
                  }
              </p>
              {offer.contributor !== "accepted" ?
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
                    Refoffer le statut de contributeur
                  </Button>
              }
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(OfferItem);
