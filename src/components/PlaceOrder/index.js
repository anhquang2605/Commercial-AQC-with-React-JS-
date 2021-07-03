import React from "react";
import {Link} from 'react-router-dom';
import "./place-order.scss";
import YourOrder from './YourOrder';
import YourPayment from "./YourPayment";
import YourShipping from "./YourShipping";
import YourTotal from "./YourTotal";
class PlaceOrder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orders: props.cartList,
            shipping: props.shipping,
            card: props.card,
            total: props.total,
        }
    }
    render() {
        return(
            <div id="place_order">
            <h4 className="flex-full">Confirm your Order</h4>
                <div className="left-panel">
                <YourOrder orders={this.state.orders}></YourOrder>
                </div>
                <div className="right-panel">
                    <YourPayment card={this.state.card}></YourPayment>
                    <YourShipping shipping={this.state.shipping}></YourShipping>
                    <YourTotal total={this.state.total}></YourTotal>
                    <Link to="/checkout">Back</Link>
                <Link to="/thank-you">Confirm and Place orders</Link>
                </div>
            </div>
        )
    }
}

export default PlaceOrder;