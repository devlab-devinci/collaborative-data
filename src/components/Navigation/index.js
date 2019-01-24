import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import {Nav, Navbar, NavItem} from "react-bootstrap";

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
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to={ROUTES.HOME}>Home</Link>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
            <NavItem eventKey={1} href={ROUTES.PROPOSE}>
                Proposer une offre
            </NavItem>
            <NavItem eventKey={2} href={ROUTES.ACCOUNT}>
                Compte
            </NavItem>
            {authUser.admin === true && (
            <NavItem eventKey={3} href={ROUTES.ADMIN}>
                Admin
            </NavItem>
            )}
            <NavItem eventKey={4} href={ROUTES.SIGN_OUT}>
                Déconnexion
            </NavItem>
        </Nav>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar>
        <Navbar.Header>
        <Navbar.Brand>
            <Link to={ROUTES.HOME}>Home</Link>
        </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
            <NavItem eventKey={1} href={ROUTES.PROPOSE}>
                Proposer une offre
            </NavItem>
            <NavItem eventKey={2} href={ROUTES.SIGN_UP}>
                Inscription
            </NavItem>
            <NavItem eventKey={3} href={ROUTES.SIGN_IN}>
                Connexion
            </NavItem>
        </Nav>
    </Navbar>
);

export default Navigation;
