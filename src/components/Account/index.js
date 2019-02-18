import React, {Component} from "react";
import "./Account.scss";

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import BecomeContributor from "../BecomeContributor";
import {Container} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {withFirebase} from "../Firebase";
import { compose } from "recompose";

//
// const SIGN_IN_METHODS = [
//   {
//     id: 'password',
//     provider: null,
//   },
//   {
//     id: 'google.com',
//     provider: 'googleProvider',
//   },
//   {
//     id: 'facebook.com',
//     provider: 'facebookProvider',
//   },
//   {
//     id: 'twitter.com',
//     provider: 'twitterProvider',
//   },
// ];

const AccountPage = () => (
  <Container>
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1 className="text-center">Salut {authUser.username} !</h1>
          <BecomeContributor authUser={authUser}/>
          <PasswordForgetForm />
          <PasswordChangeForm />
          <AccountOffers authUser={authUser}/>
          {/*<LoginManagement authUser={authUser} />*/}
        </div>
      )}
    </AuthUserContext.Consumer>
  </Container>
);

class AccountOffersBase extends Component {

    constructor(props) {
        console.log(props)
        super(props);

        this.state = {
            loading: false,
            offers: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});

        this.props.firebase.myOffers(this.props.authUser.uid).on("value", snapshot => {
            let offersObject = snapshot.val();
            console.log(offersObject)

            if(offersObject !== null) {
                offersObject =  Object.keys(offersObject).map(key => ({
                    ...offersObject[key],
                    uid: key,
                }));
            }

            this.setState({
                offers: offersObject,
                loading: false,
            });
        });
    }
    render() {
        const { offers, loading } = this.state;
        return (
            <div>
                <h2>Mes offres:</h2>
                {loading ?
                    <div>Loading ...</div>
                    : offers ? (
                        <table className="table table-sm">
                        <thead>
                        <tr>
                            <th scope="col">Titre</th>
                            <th scope="col">Catégorie</th>
                            <th scope="col">Lien</th>
                            <th scope="col">Statut</th>
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
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    ) : (
                        <p>Aucune offre postée</p>
                    )
                }
            </div>
        );
    }
}

// class LoginManagementBase extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       activeSignInMethods: [],
//       error: null,
//     };
//   }
//
//   componentDidMount() {
//     this.fetchSignInMethods();
//   }
//
//   fetchSignInMethods = () => {
//     this.props.firebase.auth
//       .fetchSignInMethodsForEmail(this.props.authUser.email)
//       .then(activeSignInMethods =>
//         this.setState({ activeSignInMethods, error: null }),
//       )
//       .catch(error => this.setState({ error }));
//   };
//
//   onSocialLoginLink = provider => {
//     this.props.firebase.auth.currentUser
//       .linkWithPopup(this.props.firebase[provider])
//       .then(this.fetchSignInMethods)
//       .catch(error => this.setState({ error }));
//   };
//
//   onDefaultLoginLink = password => {
//     const credential = this.props.firebase.emailAuthProvider.credential(
//       this.props.authUser.email,
//       password,
//     );
//
//     this.props.firebase.auth.currentUser
//       .linkAndRetrieveDataWithCredential(credential)
//       .then(this.fetchSignInMethods)
//       .catch(error => this.setState({ error }));
//   };
//
//   onUnlink = providerId => {
//     this.props.firebase.auth.currentUser
//       .unlink(providerId)
//       .then(this.fetchSignInMethods)
//       .catch(error => this.setState({ error }));
//   };
//
//   render() {
//     const { activeSignInMethods, error } = this.state;
//
//     return (
//       <div>
//         <h1>Sign in methods</h1>
//         <ul>
//           {SIGN_IN_METHODS.map(signInMethod => {
//             const onlyOneLeft = activeSignInMethods.length === 1;
//             const isEnabled = activeSignInMethods.includes(
//               signInMethod.id,
//             );
//
//             return (
//               <li key={signInMethod.id}>
//                 {signInMethod.id === 'password' ? (
//                   <DefaultLoginToggle
//                     onlyOneLeft={onlyOneLeft}
//                     isEnabled={isEnabled}
//                     signInMethod={signInMethod}
//                     onLink={this.onDefaultLoginLink}
//                     onUnlink={this.onUnlink}
//                   />
//                 ) : (
//                   <SocialLoginToggle
//                     onlyOneLeft={onlyOneLeft}
//                     isEnabled={isEnabled}
//                     signInMethod={signInMethod}
//                     onLink={this.onSocialLoginLink}
//                     onUnlink={this.onUnlink}
//                   />
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//         {error && error.message}
//       </div>
//     );
//   }
// }

// const SocialLoginToggle = ({
//   onlyOneLeft,
//   isEnabled,
//   signInMethod,
//   onLink,
//   onUnlink,
// }) =>
//   isEnabled ? (
//     <button
//       type="button"
//       onClick={() => onUnlink(signInMethod.id)}
//       disabled={onlyOneLeft}
//     >
//       Deactivate {signInMethod.id}
//     </button>
//   ) : (
//     <button
//       type="button"
//       onClick={() => onLink(signInMethod.provider)}
//     >
//       Link {signInMethod.id}
//     </button>
//   );
//
// class DefaultLoginToggle extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = { passwordOne: '', passwordTwo: '' };
//   }
//
//   onSubmit = event => {
//     event.preventDefault();
//
//     this.props.onLink(this.state.passwordOne);
//     this.setState({ passwordOne: '', passwordTwo: '' });
//   };
//
//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };
//
//   render() {
//     const {
//       onlyOneLeft,
//       isEnabled,
//       signInMethod,
//       onUnlink,
//     } = this.props;
//
//     const { passwordOne, passwordTwo } = this.state;
//
//     const isInvalid =
//       passwordOne !== passwordTwo || passwordOne === '';
//
//     return isEnabled ? (
//       <button
//         type="button"
//         onClick={() => onUnlink(signInMethod.id)}
//         disabled={onlyOneLeft}
//       >
//         Deactivate {signInMethod.id}
//       </button>
//     ) : (
//       <form onSubmit={this.onSubmit}>
//         <input
//           name="passwordOne"
//           value={passwordOne}
//           onChange={this.onChange}
//           type="password"
//           placeholder="New Password"
//         />
//         <input
//           name="passwordTwo"
//           value={passwordTwo}
//           onChange={this.onChange}
//           type="password"
//           placeholder="Confirm New Password"
//         />
//
//         <button disabled={isInvalid} type="submit">
//           Link {signInMethod.id}
//         </button>
//       </form>
//     );
//   }
// }

// const LoginManagement = withFirebase(LoginManagementBase);

const condition = authUser => !!authUser;

const AccountOffers = compose(
    withFirebase,
)(AccountOffersBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
