import React, {useState, useEffect} from 'react';
import './shipping-info.scss';
const shippingInitObj = {
    name: "Pikachu",
    address: "3637 Snell Ave",
    apt: "spc 67",
    resiState: "CA",
    city: "San Jose",
    zip: "95236"
}

const ShippingInfo = () => {
    const [shippingList, setcurrentShipping] = useState([]);
    const [currentShipping, setCurrentShipping] = useState(shippingInitObj)
    var allStates;
    fetch("USstates.json").then((dat)=>dat.json()).then(data=>{
        allStates = data;
    });
    return (
        <div id="shipping-info">
                <h4 className="check-out-title">Shipping</h4>
                {currentShipping && 
                    <div className="shipping-chosen">
                        <button className="change-btn">Change</button>
                        <span className="chosen-shipping-name">{currentShipping.name}</span>
                        <span className="chosen-shipping-address-line">{currentShipping.address} #{currentShipping.apt}</span>
                        <span className="chosen-shipping-city-state">{currentShipping.city}, {currentShipping.resiState} {currentShipping.zip} </span>
                    </div>
                }
                <div className="Shipping-changed">

                </div>
        </div>
    );
}

export default ShippingInfo;
