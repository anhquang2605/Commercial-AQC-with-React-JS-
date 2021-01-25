import {React, useState, useEffect} from 'react';
import PaginationController from './PaginationController';
import PaginationView from './PaginationView';
import './pagination.scss';
const Pagination = (props) => {
   let getTotalPageNumbers = () => {
        var totalItems = props.dalist.length;
        var divider = parseInt(itemPerPage);
        return Math.ceil(totalItems/divider);
    }
    let getItemsForPage = (startIndex) => {
        let newList = [...props.dalist];
        let itemsList =  newList.splice(startIndex, itemPerPage);
        return itemsList;
    } 
    let handlePageChange = (indexFromController) => {
       setCurPage(indexFromController);
    }
    let nextPage = () => {
        let next = curPage + 1;
        setCurPage(next);
    }
    let prevPage = () => {
        let prev = curPage - 1;
        setCurPage(prev);
    }
    let firstPage = () =>{
        setCurPage(0);
    }
    let lastPage = () =>{
        setCurPage(getTotalPageNumbers() - 1);
    }
    const [itemPerPage, setItemPerPage] = useState(8);//how many item to display
    var items = getItemsForPage(0);
   // const [itemWidth, setItemWidth] = useState(30); //percentage width of items
    const [curList, setCurList] = useState(items);
    const [pageNumber, setPageNumber] = useState(getTotalPageNumbers());
    const [curPage, setCurPage] = useState(0);//deduct one to get the start index
    const [paginified,setPaginified] = useState(pageNumber>0);
    //props.dalist got update from search result

    useEffect(()=>{
        var items = getItemsForPage(0);
        var totalPages = getTotalPageNumbers();
        setCurList(items);
        setPageNumber(totalPages);
        setPaginified(totalPages >= 2);
    },[props.dalist]);
    
    useEffect(()=>{
        var items = getItemsForPage(curPage*itemPerPage);
        setCurList(items);
    },[curPage]);
    return (
        <div className="pagination">
            {paginified && <PaginationController list={props.dalist} prev={prevPage} next={nextPage} last={lastPage} cur={curPage} lastP={getTotalPageNumbers()-1} first={firstPage} pageNo={pageNumber} handlePageChange={handlePageChange}></PaginationController>
            }
            <PaginationView list={curList}></PaginationView>
            { paginified &&
            <PaginationController list={props.dalist} prev={prevPage} next={nextPage} last={lastPage} cur={curPage} lastP={getTotalPageNumbers()-1} first={firstPage} pageNo={pageNumber} handlePageChange={handlePageChange}></PaginationController>
            }
        </div>
    );
}

export default Pagination;
