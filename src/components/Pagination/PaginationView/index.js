import {React, useState, useEffect} from 'react';
import OrderWidget from './../../OrderWidget';
import './pagination-view.scss';
const PaginationView = (props) => {
    const [list,setList] = useState(props.list);
    useEffect(()=>{
        setList(props.list);
    },[props.list])
    return (
         <div className="pagination-view">
            {list.length > 0 && list.map((item)=>{
                return(
                <OrderWidget key={item.id} id={item.id} name={item.name} types={item.types} quantity={item.quantity} price={item.price}></OrderWidget>
                );
            })}
        </div> 
    );
}

export default PaginationView;
