import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import Button from "react-bootstrap/es/Button";
import * as ROUTES from "../../constants/routes";
import {Link} from "react-router-dom";

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

  acceptStatus = () => {
      this.props.firebase.offerId(this.state.offer.uid).update({
          status : "accepted"
      }).then(() => {
          this.setState({offer : {...this.state.offer, status: "accepted"}});
      })
  };

  refuseStatus = () => {
      this.props.firebase.offerId(this.state.offer.uid).update({
          status : "refused"
      }).then(() => {
          this.setState({offer : {...this.state.offer, status: "refused"}});
      })
  };

  render() {
    const { offer, loading } = this.state;
    return (
      <div>
        <h2>Offre ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {offer && (
          <div>
              <p><strong>Titre : </strong>{offer.title}</p>
              <p><strong>Catégorie: </strong>{offer.category}</p>
              <p><strong>Lien: </strong>{offer.link}</p>
              <p><strong>Statut: </strong>{offer.status}</p>
              <Button type="button" className="btn-warning">
                  <Link
                  to={{
                  pathname: `${ROUTES.OFFERS}/${offer.uid}/modify`,
                  state: {offer},
              }}
                  >
                      Modifier l'offre
              </Link>

              </Button>

              {offer.status === "pending" &&
              <div className="d-inline-flex">
                  <Button
                      type="button"
                      onClick={this.refuseStatus}
                      className="ml-1 btn-danger"
                  >
                      Refuser l'offre
                  </Button>
                  <Button
                      type="button"
                      onClick={this.acceptStatus}
                      className="ml-1 btn-success"
                  >
                      Accepter l'offre
                  </Button>
              </div>
              }
              {offer.status === "accepted" && offer.status !== "pending " &&
                  <Button
                      type="button"
                      onClick={this.refuseStatus}
                      className="ml-1 btn-danger"
                  >
                      Refuser l'offre
                  </Button>
              }
              {offer.status === "refused" && offer.status !== "pending " &&
              <Button
                      type="button"
                      onClick={this.acceptStatus}
                      className="ml-1 btn-success"
                  >
                      Accepter l'offre
                  </Button>
              }
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(OfferItem);
