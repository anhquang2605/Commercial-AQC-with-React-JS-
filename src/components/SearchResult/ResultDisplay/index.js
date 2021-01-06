import React from 'react';
import OrderWidget from '../../OrderWidget';
class ResultDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            maxPrice: 0,
            minPrice: 0,
            inStock: true,
        }
        this.fetchItems = this.fetchItems.bind(this);
    }
    fetchItems(name = "", minPrice = 0, maxPrice = 0, inStock = true){
       fetch("ORDERS.json").then(res => res.text()).then((result)=>{
        console.log("here");
        console.log(result);
       })
    }
    componentDidMount(){
        this.fetchItems();
    }
    render(){
        return(
            <div id="result_display">
                
            </div>
        );
    }
}

export default ResultDisplay;