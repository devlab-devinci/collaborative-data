import React, {Component} from "react";
import "./Home.scss";
import {compose} from "recompose";

import {withFirebase} from "../Firebase";
import {withAlert} from "react-alert";
import { Container } from "react-bootstrap";
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

        this.props.firebase.offersAccepted().on("value", snapshot => {
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
            <div className="home">
              <div className="home__landing">
                <Container>
                    <h1 className="home__landing__title">Je recherche un abonnement</h1>
                    <nav className="home__landing__nav">
                        <a href="javascript:void()" className="home__landing__nav__link">Mobile</a>
                        <a href="javascript:void()" className="home__landing__nav__link">Internet</a>
                        <a href="javascript:void()" className="home__landing__nav__link">Gaz</a>
                        <a href="javascript:void()" className="home__landing__nav__link">Éléctricité</a>
                    </nav>
                </Container>
              </div>
              <div className="home__offers">
                <Container>
                  { loading ? <div className="home__offers__loading"><p>Chargement des offres...</p></div> : (offers ? <div className="home__offers__offer">{offers}</div> : <h1>Aucune offre disponible</h1>) }
                </Container>
              </div>

            </div>
        );
    }
}

export default compose(
    withFirebase,
    withAlert
)(HomePage);
