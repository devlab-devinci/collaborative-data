import React, { Component } from 'react';
import { Field } from 'react-final-form';
import Styles from '../Propose/Styles';

class Mobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: { min: 2, max: 10 },
        };
    }
    render() {
        return (
            <Styles>
                <div className='row-form'>
                    <label>Opérateur *</label>
                    <Field name="operator" component="select">
                        <option value="free">Free</option>
                        <option value="orange">Orange</option>
                        <option value="sfr">SFR</option>
                        <option value="bouygues">Bouygues Telecom</option>
                    </Field>
                </div>

                <Field name="dataVolume">
                    {({ input, meta }) => (
                        <div className='row-form'>
                            <label>Data (Go)</label>
                            <input {...input} type="number" placeholder="Data" value="0" />
                            {(meta.error || meta.submitError) &&
                            meta.touched && <span className='error'>{meta.error || meta.submitError}</span>}
                        </div>
                    )}
                </Field>

                <div className='row-form'>
                    <label>Engagement *</label>
                    <Field name="commitment" component="select">
                        <option value="0">Sans engagement</option>
                        <option value="6">6 mois</option>
                        <option value="12">12 mois</option>
                        <option value="24">24 mois</option>
                    </Field>
                </div>

                <div className='row-form'>
                    <label>Téléphone *</label>
                    <Field name="phone" component="select">
                        <option value="false">Sans téléphone</option>
                        <option value="true">Avec téléphone</option>
                    </Field>
                </div>

                <div className='row-form'>
                    <label>Appels *</label>
                    <Field name="calls" component="select">
                        <option value="0">Illimité</option>
                        <option value="2">2h</option>
                    </Field>
                </div>

                <div className='row-form'>
                    <label>Appels à l'étranger *</label>
                    <Field name="foreign" component="select">
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </Field>
                </div>

            </Styles>
        )
    }
}

export default Mobile;