import React from 'react';
import './table-row.scss';
const TableRow = (props) => {
    return (
        <div className="table-row">
            {props.children}
        </div>
    );
}

export default TableRow;
