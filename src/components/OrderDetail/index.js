import {React, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import ImageView from './ImageView';
import ItemDetail from './ItemDetail';
import OrderTypeRadio from './OrderTypesRadio/OrderTypeRadio';
import ORDERS from '../../model/Orders';
import './order-detail.scss';
const OrderDetail = (props) => {
    const history = useHistory();
    let idFromParams = props.match.params.id - 1;
    let theOrder = ORDERS[idFromParams];
    let getImgSrcFromType = (type) =>{
        return order.id + "-" + type + ".jpg";
    }
    const [order, setOrder] = useState(theOrder);
    const [curType, setCurType] = useState(order.types[0]);
    const [curImg, setCurImg] = useState(getImgSrcFromType(order.types[0]));
    let [quantityInput,setQuantityInput] = useState(1);
    //handler to send to order type radio so that it can update the current type for order detail component
    let upDateCurType = (daType) =>{
        setCurType(daType);
    }
    //update Quanity Input to add to cart
    let handleQuantityInput = (e) =>{
        setQuantityInput(parseInt(e.target.value));
    }
    //reset quantity when switch between types
    let resetQInput = () => {
        setQuantityInput(1);
    }
    //Add Item to cart then trigger route change to check out
    let handleBuyNow = (obj) => {
       var promise = new Promise(resolve => {
        props.addItem(obj);
        resolve();
       }) 
        promise.then(()=>{
            history.push("/checkout");
        })
    }
    //watch for curtype change then update img src 
    useEffect(()=>{
        setCurImg(getImgSrcFromType(curType));
    }, [curType]);
    
    if (order == null){
        return "Loading....";
    }
    return (
        <div id="order_detail">
            <ImageView key={curImg} imgSrc={curImg} imgName={curType + " " + order.name.toLowerCase()} ></ImageView>
            <div className="detail-container">
                <ItemDetail daOrder={order}></ItemDetail>
                <OrderTypeRadio resetQInput={resetQInput} upDateCurType={upDateCurType} types={order.types}></OrderTypeRadio>
                <span className="quantity-selector-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" value={quantityInput} min={1} max={order.quantity} onChange={handleQuantityInput}></input>
                </span>
                <div className="payment-proceed-btn-group">
                    <button onClick={()=>{
                        props.addItem({
                            name: order.name,
                            quantity: parseInt(quantityInput),
                            id: order.id,
                            price: order.price,
                            type: curType,
                        })
                        props.reRendering();
                    }} disabled={order.quantity <= 0}>Add to Cart</button>
                    <button onClick={()=> {
                        handleBuyNow({
                            name: order.name,
                            quantity: parseInt(quantityInput),
                            id: order.id,
                            price: order.price,
                            type: curType,
                        })}
                        } disabled={order.quantity <= 0}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
