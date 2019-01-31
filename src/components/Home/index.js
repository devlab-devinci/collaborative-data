import React, {Component} from 'react';
import {compose} from 'recompose';

import {withFirebase} from '../Firebase';
import {withAlert} from 'react-alert';
import {Container, Row, Card, CardDeck} from "react-bootstrap";

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
        this.setState({loading: true});

        this.props.firebase.offers().on('value', snapshot => {
            const offersObject = snapshot.val();

            const offersList = Object.keys(offersObject).map(key => ({
                ...offersObject[key],
                uid: key,
            }));

            this.setState({
                offers : offersList,
                loading: false
            });
        });

        if (this.props.location !== undefined) {
            if (this.props.location.state !== undefined) {
                this.props.alert.show(this.props.location.state.alert)
            }
        }
    }

    render() {
        const {offers, loading} = this.state;
        return (
            <Container>
                {loading ?
                    <div><p>Chargement des offres...</p></div>
                    : (offers ?
                            offers.map(offer => {
                                console.log(offer);
                                if (offer.offerType === "mobile") {
                                    return (
                                        <Card style={{width: '18rem'}} key={offer.uid}>
                                            <Card.Img variant="left" src={require('../../images/card.svg')}/>
                                            <Card.Body>
                                                <Card.Title>{offer.foreign}</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the
                                                    bulk of
                                                    the card's content.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
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
