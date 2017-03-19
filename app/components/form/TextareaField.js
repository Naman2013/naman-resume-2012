import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

const {object, string} = PropTypes;

export default class renderField extends Component {
    static propTypes = {
        input: object.isRequired,
        label: string.isRequired,
        type: string.isRequired,
        meta: object.isRequired,
        className: string,
    };

    render() {
        const { input, label, type, meta: { touched, error }, className } = this.props;

        return (
            <div className={classnames({error: touched && error})}>
                <label>
                    <span>{label}</span>
                    <textarea className={className} type={type} {...input} >{input}</textarea>
                    {touched && error && <span className="error-description">{error}</span>}
                </label>

            </div>
        );
    }
}
