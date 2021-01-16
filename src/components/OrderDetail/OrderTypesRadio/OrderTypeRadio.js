import {React, useEffect, useState} from 'react';
import "./order-type-radio.scss";
const OrderTypeRadio = (props) => {
    const [curType, setCurType] = useState('');
    const [types, setTypes] = useState([]);
    useEffect(()=>{
        setTypes(props.types);
        setCurType(props.types[0]);
    },[]);
    
    return (
        <form id="type_form">
            <span className="select-type">Select types:</span>
            { types.map((daType) => {
                return(
                <div className="radio-input-container"  key={daType}>
                    <span className="radio-color-type-display" style={{backgroundColor: daType}}></span>
                    <input onClick={()=>{
                        props.upDateCurType(daType);
                        props.resetQInput();
                    }} type="radio" id={daType} name="type" value={daType} defaultChecked={daType === curType}/>
                </div>
            )
            }) }
        </form>
    );
}

export default OrderTypeRadio;
