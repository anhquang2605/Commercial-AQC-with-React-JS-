import {React, useEffect, useState} from 'react';
import ORDERS from '../../model/Orders';
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
                <table width="60%">
                    <colgroup>
                        <col span="1"></col>
                        <col span="1"></col>
                        <col span="1"></col>
                        <col span="1"></col>
                        <col span="1"></col>
                        <col span="1"></col>
                    </colgroup>
                    <tr>
                        <th width="5%">No</th>
                        <th width="35%">Name</th>
                        <th width="5%">Quantity</th>
                        <th width="15%">Price Ea</th>
                        <th width="15%">Total</th>
                        <th></th>
                    </tr>
                    {list.map((item,index)=>{
                        return(
                        <tr key={item.name + item.type}>
                            <td>{index + 1}</td>
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
            ) : <span className="empty-kart-detail">No item</span>}
            {list.length > 0 && <button className="check-out-btn">Check out</button>}
        </div>
    );
}

export default KartDetail;
