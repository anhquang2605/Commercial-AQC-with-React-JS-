import React from 'react';
import './your-shipping.scss';
const YourShipping = (props) => {
    return (
        <div className="your-shipping sub-box flex-full">
            <h5>Shipping Info</h5>
            <span>{props.shipping.name}</span>
            <div>
                    {props.shipping.address} 
                    {props.shipping.city}, 
                    {props.shipping.resiState},
                    {props.shipping.zip}
            </div>
        </div>
    );
}

export default YourShipping;
