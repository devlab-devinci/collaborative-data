import React, {Component} from "react";
import {compose} from "recompose";

import {withFirebase} from "../Firebase";
import {withAlert} from "react-alert";
import {Container, CardColumns} from "react-bootstrap";
import Mobile from "./mobile";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            offers: null
        };
    }

    componentDidMount() {
        this.setState({loading: true});

        this.props.firebase.offers().on("value", snapshot => {
            const offersObject = snapshot.val();
            let offers = "";

            if(offersObject !==null) {
                const offersList = Object.keys(offersObject).map(key => ({
                    ...offersObject[key],
                    uid: key,
                }));

                 offers = offersList.map(offer => {
                    switch (offer.category) {
                        case "mobile":
                            return (
                                <Mobile offer={offer} key={offer.uid}/>
                            );
                        case "Mangoes":
                            return (
                                <p key={offer.uid}>toto</p>
                            );
                        case "Papayas":
                            console.log("Mangoes and papayas are $2.79 a pound.");
                            // expected output: "Mangoes and papayas are $2.79 a pound."
                            break;
                        default :
                            return (
                                <p>Unknown type of offer</p>
                            )
                    }
                    return null;
                });
            }
            this.setState({
                offers : offers,
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
                    <div><h1>Chargement des offres...</h1></div>
                    : (offers ?
                            <CardColumns>
                                {offers}
                            </CardColumns>

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
