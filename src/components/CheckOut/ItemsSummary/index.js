import React, {useState, useEffect} from 'react';
import './items-summary.scss'
const ItemsSummary = (props) => {
    const [list,setList] = useState(props.list);
    useEffect(()=>{
        setList(props.list);
    },[])

    useEffect(()=>{
        setList(props.list);
    },[props.list])
   
    return (
        <div id="items-summary" className="sub-section-checkout">
            <h4 className="check-out-title">Items summary</h4>
            <div>            
                <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {list.length > 0 && list.map((item, index)=>{
                        return(
                            <tr key={item.id + item.type}>
                                <td><img src={require("./../../../images/" +  item.id + "-" + item.type + ".jpg")}></img></td>
                                <td>{item.type + " " + item.name}</td>
                                <td>{item.quantity}</td>
                                <td>$ {item.quantity * item.price}</td>
                            </tr>     
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default ItemsSummary;
