import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAlert } from 'react-alert';
import {Container, Row, Card} from "react-bootstrap";

class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
          loading: false,
          offers: null
      };
  }

  componentDidMount() {
      this.setState({ loading: true });

      this.props.firebase.offers().on('value' , snapshot => {
        this.setState({
            offers : snapshot.val(),
            loading: false
        });
    });

    if(this.props.location !== undefined) {
        if(this.props.location.state !== undefined) {
            this.props.alert.show(this.props.location.state.alert)
        }
    }
  }

  componentWillUnmount() {
      this.setState({arrayOffers : []});
  }


  render() {
    const { offers, loading } = this.state;
      return (
        <Container>
            {loading ?
                <div><p>Chargement des offres...</p></div>
                : (offers ?
                    Object.entries(offers).map((key) => {
                        console.log(key);
                        if (key[1].offerType === "mobile") {
                            return (
                                <Row>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={require('../../images/card.svg')} />
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            )
                        }
                    })
            : <h1>Aucune offre disponible</h1>
                )}
        </Container>
    );
  }
}

export default compose(
  withFirebase,
  withAlert
)(HomePage);
