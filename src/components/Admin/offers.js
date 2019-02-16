import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session";
import * as ROUTES from "../../constants/routes";
import Container from "react-bootstrap/es/Container";
import {OfferItem, OfferList} from "../Offers";

const OffersPage = () => (
  <Container>
    <Switch>
      <Route exact path={ROUTES.OFFERS_DETAILS} component={OfferItem} />
      <Route exact path={ROUTES.OFFERS} component={OfferList} />
    </Switch>
  </Container>
);

const condition = authUser =>
  authUser && authUser.admin === (true);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(OffersPage);
