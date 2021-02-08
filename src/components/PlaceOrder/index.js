import React from "react";
import CardModal from "../Plugins/CardModal";
import {Link} from 'react-router-dom';
import "./place-order.scss";
class PlaceOrder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            card: null,
            address: null,
            total: 0
        }
    }
    render() {
        return(
            <div id="place_order">
                <CardModal name="your order">

                </CardModal>
                <CardModal name="your payment">
                    
                </CardModal>
                <CardModal name="shipping address">
                
                </CardModal>
                <Link to="/thank-you">Confirm and Place orders</Link>
            </div>
        )
    }
}

export default PlaceOrder;