import React, {Fragment, useEffect, useState} from 'react';
import './orders.scss';
import './../../Plugins/HozBox';
import HozBox from './../../Plugins/HozBox';
import CollapseTab from './../Plugins/CollapseTab';
const Orders = (props) => {
    const [orderList, setOrderList] = useState(props.ordersOfAccount.orderList); 
    let cancelOrder = (id) =>{

    }
    let handleOrderList = () =>{
        return ( 
            props.ordersOfAccount.map((item)=>(
                {     
                    title : 
                        (<Fragment>
                            <span className="tracking_id">Tracking number {item.trackingID}</span>
                            <span>Ordered on {item.orderMonth + "-" + item.orderDay + "-" + item.orderYear}</span>
                        </Fragment>),
                    content: item.orderList.map((order)=>(
                                <HozBox key={order.id}
                                imgSrc={order.id + "-" + order.type+ ".jpg"}
                                title={order.type + " " + order.name}
                                content={
                                    <Fragment>
                                        <span className="order-quantity">Quatity {order.quantity}</span>
                                        <span className="order-arrival">Arrive on {order.arrival}</span>
                                    </Fragment>
                                }>
                                </HozBox>
                        ))  
                }
            ))
        );
    }
    useEffect(() => {
        
        
    }, [props.ordersOfAccount]);
    return (
        <div className="account_orders">
            <h4>Your Orders</h4>
            {<CollapseTab list={handleOrderList()}></CollapseTab>}
        </div>
    );
}

export default Orders;
