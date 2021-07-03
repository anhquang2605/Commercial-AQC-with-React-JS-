import React from 'react';
import './your-total.scss';
const YourTotal = (props) => {
    return (
        <div className="your-total sub-box flex-full">
            <h5>Your total</h5>
            <span className="total">
                {props.total}
            </span>
        </div>
    );
}

export default YourTotal;

