import {React, useState} from 'react';
import './item-detail.scss';
const ItemDetail = (props) => {
    const [order,setOrder] = useState(props.daOrder);
    return (
        <div id="item_detail">
            <span className="product-name">{order.name}</span>
            <span className="product-price">Price: $ {order.price}</span>
            <p className="product-description">{order.description}</p>
        </div>
    );
}

export default ItemDetail;
