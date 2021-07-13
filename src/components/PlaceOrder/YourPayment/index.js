import React, {useState, useEffect} from 'react';
import './your-payment.scss';
const YourPayment = (props) => {
    const [cardEnd, setCardEnd] = useState("");
    useEffect(()=>{
        let str = props.card["card number"];
        setCardEnd(str.slice(str.length-4));
    },[]) 
    return (
        <div className="your-payment sub-box flex-full">
                        <h5>Payment method</h5>
                        <span>{props.card.owner}</span>
                        <span> Card ending in {cardEnd}</span>
        </div>
    );
}

export default YourPayment;
