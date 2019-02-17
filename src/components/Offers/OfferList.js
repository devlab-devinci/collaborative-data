import React, {Component} from "react";
import {Link} from "react-router-dom";

import {withFirebase} from "../Firebase";
import * as ROUTES from "../../constants/routes";

class OfferList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            offers: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});

        this.props.firebase.offers().on("value", snapshot => {
            const offersObject = snapshot.val();

            const offersList = Object.keys(offersObject).map(key => ({
                ...offersObject[key],
                uid: key,
            }));

            this.setState({
                offers: offersList,
                loading: false,
            });
        });
    }

    render() {
        const {offers, loading} = this.state;
        return (
            <div>
                <h1>Liste des offres :</h1>
                {loading ?
                    <div>Loading ...</div>
                    :
                    <table className="table table-sm">
                        <thead>
                        <tr>
                            <th scope="col">Titre</th>
                            <th scope="col">Catégorie</th>
                            <th scope="col">Lien</th>
                            <th scope="col">Statut</th>
                            <th scope="col">Détails</th>
                        </tr>
                        </thead>
                        <tbody>
                        {offers.map(offer => (
                            <tr
                                key={offer.uid}>
                                <td>{offer.title}</td>
                                <td>{offer.category}</td>
                                <td><a href={offer.link}>{offer.link}</a></td>
                                <td><strong>{offer.status}</strong></td>
                                <td><Link
                                    to={{
                                        pathname: `${ROUTES.OFFERS}/${offer.uid}`,
                                        state: {offer},
                                    }}
                                >
                                    Details
                                </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

export default withFirebase(OfferList);
