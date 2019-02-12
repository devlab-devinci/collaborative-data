import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session";
import { UserList, UserItem } from "../Users";
import * as ROUTES from "../../constants/routes";
import Container from "react-bootstrap/es/Container";

const UsersPage = () => (
  <Container>
    <Switch>
      <Route exact path={ROUTES.USERS_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.USERS} component={UserList} />
    </Switch>
  </Container>
);

const condition = authUser =>
  authUser && authUser.admin === (true);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(UsersPage);
