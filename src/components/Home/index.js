import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAlert } from 'react-alert';
import {Grid, Col, Row} from "react-bootstrap";

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

    render() {
        const { offers, loading } = this.state;
        if(offers !=null) {
            console.log(offers);
            Object.entries(offers).forEach(
                ([clé, valeur]) =>
                    Object.entries(valeur).forEach(
                        ([clé, valeur]) =>
                            Object.entries(valeur).forEach(
                                ([clé, valeur]) =>
                                    console.log(clé)
                            )
                    )
            );
        }
        return (
            <Grid>
                {loading && <div><p>Chargement des offres...</p></div>}

                {offers && (
                    <Row className="show-grid">
                        <Col xs={12} md={8}>
                        </Col>
                        <Col xs={6} md={4}>
                            <h1>liste offres</h1>
                        </Col>
                    </Row>
                )}
            </Grid>
        );
    }
}

export default compose(
    withFirebase,
    withAlert
)(HomePage);
