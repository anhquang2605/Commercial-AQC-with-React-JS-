import React, {useState, useEffect} from 'react';

const ProcessTracker = (props) => {
    const [list, setList] = useState();
    const [curItem, setCurItem] = useState(null);
    useEffect(() => {
        if(props.list !== undefined && props.list !== null){
            setList(props.list)
        }
    }, []);
    return (
        <div className="process-tracker" id={ props.name? "process_"+props.name : ""}>
            {list ? list.map((item)=>(
                <div key={item.name}>
                    <div className="item-done"></div>
                    <div classname="item-name"></div>
                </div>
            )): "No Item"}
        </div>
    );
}

export default ProcessTracker;
