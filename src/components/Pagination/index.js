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
    const [itemPerPage, setItemPerPage] = useState(9); 
    var items = getItemsForPage(0);
   // const [itemWidth, setItemWidth] = useState(30); //percentage width of items
    const [curList, setCurList] = useState(items);
    const [pageNumber, setPageNumber] = useState(getTotalPageNumbers());
   // const [curPage, setCurPage] = useState(1);//deduct one to get the start index
    const [paginified,setPaginified] = useState(pageNumber>0);
    //props.dalist got update from search result

    useEffect(()=>{
        var items = getItemsForPage(0);
        var totalPages = getTotalPageNumbers();
        setCurList(items);
        setPageNumber(totalPages);
    },[props.dalist]);
    
    return (
        <div className="pagination">
            <PaginationView list={curList}></PaginationView>
            { paginified &&
            <PaginationController pageNo={pageNumber} handlePageChange={handlePageChange}></PaginationController>
            }
        </div>
    );
}

export default Pagination;
