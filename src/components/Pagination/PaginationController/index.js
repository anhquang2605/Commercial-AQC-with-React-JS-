import React from 'react';
import './pagination-controller.scss';
const PaginationController = (props) => {
    const listOfPage = [];
    let i = 0;
    let length = props.pageNo;
    for (i; i < length; i+=1){
        listOfPage.push((<span onClick={()=>{
            props.handlePageChange(i);
        }} className="page-no" key={i}>{i + 1}</span>))
    }
    return (
        <div className="pagination-controller">
            <span className="first-btn">First</span>
            <span className="prev-btn">Prev</span>
            <span className="pages-number">
                {listOfPage}
            </span>
            <span className="next-btn">Next</span>
            <span className="last-btn">Last</span>
        </div>
    );
}

export default PaginationController;
