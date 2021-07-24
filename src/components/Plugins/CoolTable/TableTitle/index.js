import React from 'react';
import './table-title.scss';
const TableTitle = (props) => {
    return (
        <div className="table-title">
            {props.titleList && props.titleList.map((item,index)=>(
                <div className={"title-item"+" col-"+(index+1)} key={item}>{item}</div>
            ))}
        </div>
    );
}

export default TableTitle;
