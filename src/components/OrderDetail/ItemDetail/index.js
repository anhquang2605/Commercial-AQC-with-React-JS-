import {React, useState} from 'react';
import './item-detail.scss';
const ItemDetail = (props) => {
    const [order,setOrder] = useState(props.daOrder);
    return (
        <div id="item_detail">
            <span className="product-name">{order.name}</span>
            <span className="product-price">Price: $ {order.price}</span>
            <p className="product-description">{order.description}</p>
            <span className="product-availability">
                {order.quantity<=0?(
                    <span className="out-of-stock">Out of stock</span>
                ):(
                    <span>
                        <span className="item-in-stock">In Stock</span>
                        <span className="item-quantity">{order.quantity} left</span>
                    </span>
                )}
            </span>
        </div>
    );
}

export default ItemDetail;
