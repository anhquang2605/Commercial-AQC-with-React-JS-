import React from 'react';
import './awesome-form.scss';
const AwesomeForm = (props) => {
    return (
        <div className="awesome_form">
            <h5>{props.title}</h5>
            {props.children}
        </div>
    );
}

export default AwesomeForm;
