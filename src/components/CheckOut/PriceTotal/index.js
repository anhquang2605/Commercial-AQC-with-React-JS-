import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './price-total.scss';
const PriceTotal = (props) => {
    let getSum = () => {
        let initial = 0;
        var sum = list.reduce((prev,current) => {
            return prev + (current.price * current.quantity);
        }, initial);
        return sum;
    }
    const [list,setList] = useState(props.list);
    const [sum, setSum] = useState(getSum());
    const [tax, setTax] = useState(15);
    const [debit, setDebit] = useState(isNaN(props.debit)? 0 : props.debit);
    const [dis, setDis] =  useState(isNaN(props.dis)? 0 : props.dis);
    let getSubTotal = () => {
        var dasum = (sum + ((tax * sum)/100)) - debit - ((dis*sum)/100);
        if (dasum < 0) {
            props.setTotalForCheckOut(0)
            return 0;
        } else {
            props.setTotalForCheckOut(dasum);
            return dasum
        }
    }
    let handleStick = (target) =>{
        let totalPriceComp = document.getElementsByClassName("total-price")[0];
        let compOffsetTop = totalPriceComp.offsetTop;
        var handleOffsetOfScroll = target.scroll().handleOffset.y;
        if(compOffsetTop < handleOffsetOfScroll){
            totalPriceComp.classList.add("sticky");
        } else {
            totalPriceComp.classList.remove("sticky");
        }
    }
    useEffect(()=>{
        setList(props.list);
        setSum(getSum());
        let target = props.osRef.osInstance();
        target.options({
            callbacks:{
                onScroll: ()=>{handleStick(target)}
            }
        })
       
    },[])

    useEffect(()=>{
        setList(props.list);
        setSum(getSum());
        
    },[props.list])

    useEffect(()=>{
        setDis(parseInt(props.dis));
        setDebit(parseInt(props.debit));
    },[props.dis,props.debit])
    return (
        <div className="total-price" key={props}>
            <h4>Order Summary</h4>
            <span className="price-row">
                <span className="item-label">Before Tax:</span>
                <span className="item-value">$ {sum}</span>    
            </span>
            <span className="price-row">
                <span className="item-label">Tax ({tax}%):</span>
                <span className="item-value">$ {(tax * sum)/100}</span>    
            </span>
            <span className="price-row">
                <span className="item-label">Discount (ammount): </span>
                <span className="item-value">$ {debit}</span>    
            </span>
            <span className="price-row">
                <span className="item-label">Discount ({props.dis}%):</span>
                <span className="item-value">$ {(dis*sum)/100}</span>    
            </span>
            <hr></hr>
            <span className="price-row">
                <span className="item-label final">Total:</span>
                <span className="item-value">$ {getSubTotal()}</span>    
            </span>
            <Link to="/place-order" className={"order-place-btn btn" + (props.card !== undefined ? "" : " disabled")}>Place Orders</Link>
        </div>
    );
}

export default PriceTotal;
