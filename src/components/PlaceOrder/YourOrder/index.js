import React, {Fragment} from 'react';
import './your-order.scss';
import HozBox from '../../Plugins/HozBox';
const YourOrder = (props) => {
    return (
        <div className="your-order main-box flex-full">
            <h5>You ordered</h5>
        {props.orders.length > 0 && props.orders.map((order)=>{
            const extraContent = (
                <Fragment>
                    <span className="order-quantity">Quantity: {order.quantity}</span>
                    <span className="order-total-price">$ {order.price * order.quantity}</span>
                </Fragment>
            );
            return (<HozBox key={order.id + order.type} title={order.type + " " + order.name} imgSrc={order.id + "-" + order.type + ".jpg"} extraContent={extraContent}></HozBox>)
        })}
    </div>
    );
}

export default YourOrder
