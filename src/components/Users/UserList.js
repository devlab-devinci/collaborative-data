import React, {Component} from "react";
import "./UserList.scss";

import {Link} from "react-router-dom";

import {withFirebase} from "../Firebase";
import * as ROUTES from "../../constants/routes";

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});

        this.props.firebase.users().limitToFirst(10).on("value", snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            console.log(usersList)

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const {users, loading} = this.state;

        return (
            <div className="user-list">
                <h1 className="user-list__title">Liste des utilisateurs</h1>
                {loading ?
                    <div>Loading ...</div>
                    :
                    <table className="user-list__table">
                        <thead>
                            <tr>
                                <th scope="col">E-mail</th>
                                <th scope="col">Pseudo</th>
                                <th scope="col">Admin</th>
                                <th scope="col">Contributeur</th>
                                <th scope="col">Détails</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.uid}>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        {user.admin ?
                                            <strong>Oui</strong>
                                            :
                                            <strong>Non</strong>
                                        }
                                    </td>
                                    <td>{user.contributor}</td>
                                    <td><Link
                                        to={{
                                            pathname: `${ROUTES.USERS}/${user.uid}`,
                                            state: {user},
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

export default withFirebase(UserList);
