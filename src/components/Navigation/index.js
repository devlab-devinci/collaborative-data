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

    <Nav
    >
        <Nav.Item>
            <Nav.Link href={ROUTES.HOME}>Accueil</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href={ROUTES.PROPOSE}>Proposer une offre</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href={ROUTES.ACCOUNT}>Mon compte</Nav.Link>
        </Nav.Item>
        {authUser.admin === true && (
        <NavItem>
            <Nav.Link href={ROUTES.ADMIN}>Admin</Nav.Link>
        </NavItem>
        )}
        <NavItem href={ROUTES.SIGN_OUT}>
            <Nav.Link href={ROUTES.SIGN_OUT}>Déconnexion</Nav.Link>
        </NavItem>
    </Nav>
);

const NavigationNonAuth = () => (
    <Nav
    >
        <Nav.Item>
            <Nav.Link href={ROUTES.HOME}>Accueil</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-1" href={ROUTES.PROPOSE}>Proposer une offre</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-2" href={ROUTES.SIGN_UP}>S'inscrire</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-3" href={ROUTES.SIGN_IN}>Se connecter</Nav.Link>
        </Nav.Item>
    </Nav>

);

export default Navigation;
