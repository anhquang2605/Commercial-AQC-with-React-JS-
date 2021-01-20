import React from 'react';
import Pagination from './../../Pagination';

import './result-display.css';
class ResultDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            maxPrice: 0,
            minPrice: 0,
            getInStock: false,
            list: [],
            foundList: []
        }
        this.fetchItems = this.fetchItems.bind(this);
    }
    static getDerivedStateFromProps(props,state){
        return({
            name: props.name,
            maxPrice: props.maxPrice,
            minPrice: props.minPrice,
            getInStock: props.inStock
        });
    }
    getItemBasedOnSearchResult(){
        let list = this.state.list;
        let newList = [];
        let result = [];
        let nameResult = this.state.name;
        let maxPriceResult = parseInt(this.state.maxPrice);
        let minPriceResult = parseInt(this.state.minPrice);
        let getInStockResult = this.state.getInStock;
        if(getInStockResult){
            list.forEach((item) =>{
                var nameMatchResult = item.name.toLowerCase().search(nameResult);
                if (nameMatchResult != -1 && item.quantity > 0){
                    newList.push(item);
                } 
            });
        } else {
            list.forEach((item) =>{
                var nameMatchResult = item.name.toLowerCase().search(nameResult);
                if (nameMatchResult != -1){
                    newList.push(item);
                } 
            });
        }
        
        if (maxPriceResult === 0){
           result = newList.filter(item => (parseInt(item.price) >= minPriceResult));
        }else {
           result = newList.filter(item => (parseInt(item.price) >= minPriceResult && parseInt(item.price) <= maxPriceResult));
        }
        return result;
    }
    fetchItems(){
        fetch("../ORDERS.json").then(res => res.json()).then((result)=>{
             this.setState({
                 list: result,
             });
        })
     }
    componentDidMount(){
        this.fetchItems();
    }
    render(){
        const foundList = this.getItemBasedOnSearchResult();
        return(
            <div id="result_display">
                    <h4>Results: ({foundList.length})</h4>
                    { foundList.length >0 ? (<Pagination  dalist={foundList}></Pagination>) : ( <div>Not found</div>) }   
            </div>
        );
    }
}

export default ResultDisplay;