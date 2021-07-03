import React from 'react';
import './your-payment.scss';
const YourPayment = (props) => {
    return (
        <div className="your-payment sub-box flex-full">
                        <h5>Payment method</h5>
                        <span>{props.card.owner}</span>
                        <span>{props.card["card number"]}</span>
        </div>
    );
}

export default YourPayment;
