import React, {Component} from 'react';

import { withFirebase } from '../Firebase';
import HomePage from '../Home';

class Signout extends Component {
    constructor(props) {
        super(props);
        this.props.firebase.doSignOut()
    }
    render() {
        return(
            <HomePage/>
        )
    }
}

export default withFirebase(Signout);
