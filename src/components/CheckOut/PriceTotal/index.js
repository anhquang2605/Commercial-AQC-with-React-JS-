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
    useEffect(()=>{
        setList(props.list);
        setSum(getSum());
    },[])

    useEffect(()=>{
        setList(props.list);
        setSum(getSum());
    },[props.list])
    return (
        <div className="total-price">
            <h4>Order Summary</h4>
            <span className="price-row">
                <span className="item-label">Before Tax:</span>
                <span className="item-value">$ {sum}</span>    
            </span>
            <span className="price-row">
                <span className="item-label">Tax ({tax}%):</span>
                <span className="item-value">$ {(tax * sum)/100}</span>    
            </span>
            <hr></hr>
            <span className="price-row">
                <span className="item-label final">Total:</span>
                <span className="item-value">$ {sum + ((tax * sum)/100)}</span>    
            </span>
            <Link to="/place-order" className="order-place-btn btn">Place Orders</Link>
        </div>
    );
}

export default PriceTotal;
