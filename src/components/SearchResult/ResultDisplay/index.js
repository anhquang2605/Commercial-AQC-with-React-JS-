import React from 'react';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import OrderWidget from '../../OrderWidget';
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
    componentDidMount(){
        this.fetchItems();
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
    render(){
        const dalist = this.getItemBasedOnSearchResult();
        return(
            <div id="result_display">
                    { dalist.length >0 ? (dalist.map((item)=>(
                         <OrderWidget key={item.id} id={item.id} name={item.name} quantity={item.quantity} inStock={item.inStock} price={item.price} types={item.types}>

                         </OrderWidget>
                    ))) : <div>Not found</div> }   
            </div>
        );
    }
}

export default ResultDisplay;