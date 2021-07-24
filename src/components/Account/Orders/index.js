import React, {Fragment, useEffect, useState} from 'react';
import './orders.scss';
import './../../Plugins/HozBox';
import CoolTable from './../../Plugins/CoolTable';
const Orders = (props) => {
    const [orders, setOrders] = useState({delivered: [], onTheWay: []})
    const titleList = ["preview", "name", "type", "arrival", "status"]
    let filterOrdersByEra = () =>{
        let delivered = [];
        let onTheWay = [];
        if(props.ordersOfAccount && props.ordersOfAccount.length > 0){
            for (let orderPack of props.ordersOfAccount){
                for(let item of orderPack.orderList){
                    item.status = orderPack.status;
                }
                console.log(orderPack.orderList);
                if (orderPack.status === "delivered"){
                    delivered.push(orderPack);
                } else{
                    onTheWay.push(orderPack);
                }
            }
            setOrders((prevState)=>({
                ...prevState,
                delivered: delivered,
                onTheWay: onTheWay
            }))
        }
    }
    useEffect(()=>{
        filterOrdersByEra();
    },[])
    useEffect(() => {
        
    }, [props.ordersOfAccount]);
    return (
        <div className="account_orders">
            <div className="current-orders order-section">
            <h5 className="panel-title">Current Order</h5>
            {orders.onTheWay && orders.onTheWay.map((item)=>(
                 <CoolTable key={item.trackingID} titleList={titleList} list={item.orderList}>
                     <div className="package-info">
                        <div className="order-tracking">Order tracking number <span className="tracking-id">#{item.trackingID}</span></div>
                        <div className="order-date">Date placed: <span className="date-placed">{item.orderMonth + "-" + item.orderDay+"-"+item.orderYear}</span></div>
                        {item.shippedTo && <div className="shipped-to">Shipped to: <span className="shipped-address">{item.shippedTo.address}</span></div>}
                     </div>    
                 </CoolTable>
            ))}
            </div>
            <div className="past-orders order-section">    
            <h5 className="panel-title">From the past</h5>
            {orders.delivered && orders.delivered.map((item)=>(
                 <CoolTable key={item.trackingID} titleList={titleList} list={item.orderList}> 
                    <div className="package-info">
                        <div className="order-tracking">Order tracking number <span className="tracking-id">#{item.trackingID}</span></div>
                        <div className="order-date">Date placed: <span className="date-placed">{item.orderMonth + "-" + item.orderDay+"-"+item.orderYear}</span></div>
                        {item.shippedTo && <div className="shipped-to">Shipped to: <span className="shipped-address">{item.shippedTo.address}</span></div>}
                    </div>   
                 </CoolTable>
            ))}
            </div>
        </div>
    );
}

export default Orders;
