import React, {useState,useEffect} from 'react';
import Payment from './Payment';
import ItemsSummary from './ItemsSummary';
import ShippingInfo from './ShippingInfo';
import PriceTotal from './PriceTotal';
import './check-out.scss';
const CheckOut = (props) => {
    let [dis, setDis] = useState(0);
    let [debitDis, setDebitDis] = useState(0);
    let getDis = (percentage = 0) => {
        setDis(percentage)
    }  
    let getDebitDis = (ammount = 0) => {
        setDebitDis(ammount);
    } 
    return (
        <div id="check_out">
            <div className="left-container">
                <ShippingInfo></ShippingInfo>
                <Payment getDis={getDis} getDebitDis={getDebitDis}></Payment>
                <ItemsSummary list={props.list}></ItemsSummary>
            </div>
            <div className="right-container">
                <PriceTotal dis={dis} debit={debitDis}  list={props.list}></PriceTotal>
            </div>
            
        </div>
    );
}

export default CheckOut;
