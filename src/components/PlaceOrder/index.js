import React, { Fragment } from "react";
import CardModal from "../Plugins/CardModal";
import HozBox from "../Plugins/HozBox";
import {Link} from 'react-router-dom';
import "./place-order.scss";
class PlaceOrder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orders: props.cartList,
            shipping: props.paymentFinal.shipping,
            card: props.paymentFinal.card,
            total: props.paymentFinal.total,
        }
    }
    render() {
        return(
            <div id="place_order">
                <CardModal name="your order">
                    <div>
                        {this.state.orders.length > 0 && this.state.orders.map((order)=>{
                            const extraContent = (
                                <Fragment>
                                    <span className="order-quantity">Quantity: {order.quantity}</span>
                                    <span className="order-total-price">$ {order.price * order.quantity}</span>
                                </Fragment>
                            );
                            return (<HozBox key={order.id + order.type} title={order.type + " " + order.name} imgSrc={order.id + "-" + order.type + ".jpg"} extraContent={extraContent}></HozBox>)
                        })}
                    </div>
                </CardModal>
                <CardModal name="your payment">
                    <div className="payment-sum">
                        <span>{this.state.card.owner}</span>
                        <span>{this.state.card["card number"]}</span>
                    </div>
                </CardModal>
                <CardModal name="shipping address">
                        <span>{this.state.shipping.name}</span>
                        <div>
                             {this.state.shipping.address} 
                             {this.state.shipping.city}, 
                             {this.state.shipping.resiState},
                             {this.state.shipping.zip}
                        </div>
                </CardModal>
                <CardModal name="your total">
                        <span className="total">
                            {this.state.total}
                        </span>
                </CardModal>
                <Link to="/checkout">Back</Link>
                <Link to="/thank-you" onClick={this.props.flushCartList}>Confirm and Place orders</Link>
            </div>
        )
    }
}

export default PlaceOrder;