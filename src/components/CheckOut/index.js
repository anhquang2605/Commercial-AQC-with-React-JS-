import React, {useState,useEffect} from 'react';
import Payment from './Payment';
import ItemsSummary from './ItemsSummary';
import ShippingInfo from './ShippingInfo';
import PriceTotal from './PriceTotal';
import './check-out.scss';
const CheckOut = (props) => {
    return (
        <div id="check_out">
            <div className="left-container">
                <ShippingInfo></ShippingInfo>
                <Payment></Payment>
                <ItemsSummary list={props.list}></ItemsSummary>
            </div>
            <div className="right-container">
                <PriceTotal list={props.list}></PriceTotal>
            </div>
            
        </div>
    );
}

export default CheckOut;
