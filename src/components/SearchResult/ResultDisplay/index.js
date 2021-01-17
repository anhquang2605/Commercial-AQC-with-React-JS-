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
    fetchItems(){
       fetch("../ORDERS.json").then(res => res.json()).then((result)=>{
            this.setState({
                list: result
            })
       })
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
    componentDidMount(){
        this.fetchItems();
    }
    componentDidUpdate(){
        var foundItems = this.getItemBasedOnSearchResult();
        this.setState({
            foundList: foundItems
        });
    }
    componentWillUnmount(){
        this.setState({});
    }
    render(){
        console.log(this.state.foundList);
        return(
            <div id="result_display">
                    <h4>Results: ({this.state.foundList.length})</h4>
                    { this.state.foundList.length >0 ? (<Pagination key={this.state.list} list={this.state.list}></Pagination>) : ( <div>Not found</div>) }   
            </div>
        );
    }
}

export default ResultDisplay;