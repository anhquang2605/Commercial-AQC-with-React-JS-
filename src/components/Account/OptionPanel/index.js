import React, {useState, useEffect} from 'react';
import './option-panel.scss';
const OptionPanel = (props) => {
    const [list, setList] = useState([]);
    const [current, setCurrent] = useState(props.list[0].name);
    useEffect(() => {
        setList(props.list);
    }, []);
    return (
        <ul className="option-panel">
            {list.length > 0 ? list.map((item) =>
                (<li key={item.name}>
                    <a className={current === item.name ? "currentOp" : ""} onClick={(e)=>{
                        e.preventDefault();
                        props.setCurrent(item.name);
                        setCurrent(item.name);
                    }} href="#">
                        {item.name}
                    </a>
                </li>)
            ) : <span>No item</span>}        
        </ul>
    );
}

export default OptionPanel;
