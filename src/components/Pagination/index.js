import {React, useState, useEffect} from 'react';
import PaginationController from './PaginationController';
import PaginationView from './PaginationView';
import './pagination.scss';
const Pagination = (props) => {
    console.log(props.list);
    let getTotalPageNumbers = () => {
        var totalItems = props.list.length;
        var divider = parseInt(itemPerPage);
        return Math.ceil(totalItems/divider);
    }
    let getItemsForPage = (startIndex) => {
        let newList = props.list;
        let itemsList =  newList.splice(startIndex, itemPerPage);
        return itemsList;
    } 
    let handlePageChange = (indexFromControler) => {
        console.log(indexFromControler);
        //setCurPage(indexFromController);
    }
    const [,setState] = useState();
    const [itemPerPage, setItemPerPage] = useState(9); 
    const [itemWidth, setItemWidth] = useState(30); //percentage width of items
    const [curList, setCurList] = useState(getItemsForPage(0));
    const [pageNumber, setPageNumber] = useState(getTotalPageNumbers());
    const [curPage, setCurPage] = useState(1);//deduct one to get the start index
    const [paginified,setPaginified] = useState(pageNumber>0);
    useEffect(() => {
        if(curList == []){
            setCurList(getItemsForPage(0));
            setPageNumber(getTotalPageNumbers());
            setCurPage(1);
        }
    }, [props.list]);

    if (props.list.length == 0){
        return ("No result");
    }
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
