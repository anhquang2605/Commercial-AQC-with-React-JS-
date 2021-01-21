import { checkPropTypes } from 'prop-types';
import React, {useState, useEffect} from 'react';
import './pagination-controller.scss';
const PaginationController = (props) => {
    const [curPage, setCurPage] = useState(props.cur);
    const [,setState] = useState();
    const [lastPage, setLastPage] = useState(props.lastP);
    const listOfPage = [];
    let i = 0;
    let length = props.pageNo;
    while(i < length){
        listOfPage.push((<span  data-index={i} onClick={(e)=>{
            e.stopPropagation();
            let index = e.target.getAttribute("data-index");
            props.handlePageChange(index);
        }} className={(props.cur == i? "cur-page-btn " : "") + "page-no"} key={i}>{i + 1}</span>));
        i+=1;
    }
    useEffect(()=>{
        //if the current page number is updated
        setCurPage(props.cur);
    },[props.cur]);
    useEffect(()=>{
        //if the list changed
        props.handlePageChange(0);//tells the parents to update to page 1

    },[props.list]);
    return (
        <div className="pagination-controller">
            <span hidden={curPage == 0} className="first-btn" onClick={(e)=>{
                e.stopPropagation();
                props.first();
            }}>First</span>
            <span className="prev-btn" hidden={curPage == 0} onClick={(e)=>{
                e.stopPropagation();
                props.prev();
            }}>Prev</span>
            <span key={curPage} className="pages-number">
                {listOfPage}
            </span>
            <span hidden={curPage == props.lastP } className="next-btn"onClick={(e)=>{
                e.stopPropagation();
                props.next();
            }}>Next</span>
            <span hidden={curPage == props.lastP } className="last-btn"onClick={(e)=>{
                e.stopPropagation();
                props.last();
            }}>Last</span>
        </div>
    );
}

export default PaginationController;
