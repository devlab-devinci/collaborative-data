import React from "react";

import { AuthUserContext } from "../Session";
import * as ROUTES from "../../constants/routes";
import {Nav, Navbar} from "react-bootstrap";

const Navigation = () => (

    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <NavigationAuth authUser={authUser} />
            ) : (
                <NavigationNonAuth />
            )
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (

    <Navbar bg="primary" expand="lg" variant="dark" collapseOnSelect>
        <Navbar.Brand href={ROUTES.HOME}>Collaborative Data</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end">
                <Nav.Link href={ROUTES.PROPOSE}>Proposer une offre</Nav.Link>
                <Nav.Link href={ROUTES.ACCOUNT}>Mon compte</Nav.Link>
                {authUser.admin === true && (
                <Nav.Link href={ROUTES.ADMIN}>Admin</Nav.Link>
                )}
                <Nav.Link href={ROUTES.SIGN_OUT}>Déconnexion</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar bg="primary" expand="lg" variant="dark" collapseOnSelect>
      <Navbar.Brand href={ROUTES.HOME}>Collaborative Data</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end">
                <Nav.Link href={ROUTES.PROPOSE}>Proposer une offre</Nav.Link>
                <Nav.Link href={ROUTES.SIGN_IN}>Se connecter</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Navigation;
