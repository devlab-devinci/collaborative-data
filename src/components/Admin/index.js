import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session";
import { UserList, UserItem } from "../Users";
import * as ROUTES from "../../constants/routes";
import Container from "react-bootstrap/es/Container";

const AdminPage = () => (
  <Container>
    <h1>Admin</h1>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </Container>
);

const condition = authUser =>
  authUser && authUser.admin === (true);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
