import React, {useState, useEffect} from 'react';
import './pagination-controller.scss';
const PaginationController = (props) => {
    const [curPage, setCurPage] = useState(props.cur);
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
        setCurPage(props.cur);
    },[props.cur])
    return (
        <div className="pagination-controller">
            <span className="first-btn" onClick={(e)=>{
                e.stopPropagation();
                props.first();
            }}>First</span>
            <span className="prev-btn" hidden={curPage == 0} onClick={(e)=>{
                e.stopPropagation();
                props.prev();
            }}>Prev</span>
            <span className="pages-number">
                {listOfPage}
            </span>
            <span hidden={curPage == props.lastP } className="next-btn"onClick={(e)=>{
                e.stopPropagation();
                props.next();
            }}>Next</span>
            <span className="last-btn"onClick={(e)=>{
                e.stopPropagation();
                props.last();
            }}>Last</span>
        </div>
    );
}

export default PaginationController;
