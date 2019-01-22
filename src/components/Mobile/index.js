import React, { Component, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import Styles from '../Propose/Styles';

class Mobile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Styles>
                <label>Opérateur</label>
                <Field name="operator" component="select">
                    <option value="free">Free</option>
                    <option value="orange">Orange</option>
                    <option value="sfr">SFR</option>
                    <option value="bouygues">Bouygues Telecom</option>
                </Field>

                <Field name="dataVolume">
                    {({ input, meta }) => (
                        <div>
                            <label>Data (Go)</label>
                            <input {...input} type="range" min="1" max="100"/>
                            {(meta.error || meta.submitError) &&
                            meta.touched && <span>{meta.error || meta.submitError}</span>}
                        </div>
                    )}
                </Field>

                <Field name="dataVolume">
                    {({ input, meta }) => (
                        <div>
                            <label>Data (Go)</label>
                            <input {...input} type="range" min="1" max="100"/>
                            {(meta.error || meta.submitError) &&
                            meta.touched && <span>{meta.error || meta.submitError}</span>}
                        </div>
                    )}
                </Field>
            </Styles>
        )
    }
}

export default Mobile;