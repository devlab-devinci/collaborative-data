import React, { Component } from 'react';
import { Field } from 'react-final-form';

class Mobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: { min: 2, max: 10 },
        };
    }
    render() {
        return (
            <div>
                <div className='form-group'>
                    <label>Opérateur</label>
                    <Field name="operator" component="select" className="form-control">
                        <option value="free">Free</option>
                        <option value="orange">Orange</option>
                        <option value="sfr">SFR</option>
                        <option value="bouygues">Bouygues Telecom</option>
                    </Field>
                </div>

                <Field name="dataVolume">
                    {({ input, meta }) => (
                        <div className='form-group'>
                            <label>Data
                                {(meta.error || meta.submitError) && meta.touched &&
                                <span className='error'>{meta.error || meta.submitError}
                                        </span>}
                            </label>
                            <input {...input} type="text" placeholder="Data " className="form-control" />
                        </div>
                    )}
                </Field>

                <div className='form-group'>
                    <label>Engagement</label>
                    <Field name="commitment" component="select" className="form-control">
                        <option value="0">Sans engagement</option>
                        <option value="6">6 mois</option>
                        <option value="12">12 mois</option>
                        <option value="24">24 mois</option>
                    </Field>
                </div>

                <div className='form-group'>
                    <label>Téléphone</label>
                    <Field name="phone" component="select" className="form-control">
                        <option value="false">Sans téléphone</option>
                        <option value="true">Avec téléphone</option>
                    </Field>
                </div>

                <div className='form-group'>
                    <label>Appels</label>
                    <Field name="calls" component="select" className="form-control">
                        <option value="0">Illimité</option>
                        <option value="2">2h</option>
                    </Field>
                </div>

                <div className='form-group'>
                    <label>Appels à l'étranger</label>
                    <Field name="foreign" component="select" className="form-control">
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </Field>
                </div>

            </div>
        )
    }
}

export default Mobile;