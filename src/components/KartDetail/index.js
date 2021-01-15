import {React, useEffect, useState} from 'react';

const KartDetail = (props) => {
    const [list,setList] = useState(props.list);
    useEffect(() => {
        setList(props.list);
    }, [props.list]);
    return (
        <div id="kart_detail">
            <h4>Kart Detail</h4>
            {list.length > 0 ? (
                <table>
                    <colgroup>
                        <col></col>
                        <col></col>
                        <col></col>
                        <col></col>
                    </colgroup>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    {list.map((item,index)=>{
                        return(
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.type + " " + item.name}</td>
                            <td><input type="number" value={item.quantity} onChange={()=>{
                                props.changeQuantity(index, item.quantity);
                            }}></input></td>
                            <td><button className="remove-item-btn" onClick={()=>{
                                props.removeItem(index);
                            }}>Delete</button></td>
                        </tr>)
                    })}
                </table>
            ) : "No item"}
            {list.length > 0 && <button className="check-out-btn">Check out</button>}
        </div>
    );
}

export default KartDetail;
