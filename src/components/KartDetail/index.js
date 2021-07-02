import {React, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ORDERS from '../../model/Orders';
import {ReactComponent as SadBag} from './sadbag.svg';
import './kart-detail.scss';
const KartDetail = (props) => {
    const [list,setList] = useState(props.list);
    const [,setState] = useState();
    let handleQuantityChange = (e, index) => {
        let val = parseInt(e.target.value);
        props.changeQuantity(index, val);
        props.rerenderer();
    } 
    useEffect(() => {
        setList(props.list);
    }, [props.list]);
    useEffect(()=>{
    
    }, [list])
    return (
        <div id="kart_detail">
            <h4>Kart Detail</h4>
            {list.length > 0 ? (
                <table>
                    <tr>
                        <th width="10%"></th>
                        <th width="40%">Name</th>
                        <th width="5%">Quantity</th>
                        <th width="15%">Price Ea</th>
                        <th width="15%">Total</th>
                        <th></th>
                    </tr>
                    {list.map((item,index)=>{
                        return(
                        <tr key={index}>
                            <td><img src={require("./../../images/" + item.id + "-" +item.type+ ".jpg")}></img></td>
                            <td>{item.type + " " + item.name}</td>
                            <td><input max={ORDERS[item.id-1].quantity}  type="number" value={item.quantity} onChange={ (e) => {handleQuantityChange(e,index)}}
                            ></input></td>
                            <td>$ {item.price}</td>
                            <td>$ {item.price * item.quantity}</td>
                            <td><button className="remove-item-btn" onClick={()=>{
                                props.removeItem(index);
                            }}>Delete</button></td>
                        </tr>)
                    })}
                </table>
            ) : <div className="empty-kart-detail">
                <SadBag></SadBag>
                Your bag is so empty</div>}
            {list.length > 0 && <Link className="check-out-btn btn" to="/checkout">Check out</Link>}
        </div>
    );
}

export default KartDetail;
