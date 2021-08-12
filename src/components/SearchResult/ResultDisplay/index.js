import React from 'react';
import Pagination from './../../Pagination';
import SORT_CRITERIAS from './../../../Constants/SortItemsForSearch';
import './result-display.scss';
import Sorter from './../Sorter';
class ResultDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchQueue: {
                name: props.name,
                maxPrice: props.maxPrice,
                minPrice: props.minPrice,
                inStock: props.inStock,
            },
            list: [],
            foundList: []
        }
        this.fetchItems = this.fetchItems.bind(this);
        this.setList = this.setList.bind(this);
    }
    setList(list){
        this.setState({
            foundList: list
         })
    }
    getItemBasedOnSearchResult(){
        let list = this.state.list;
        let newList = [];
        let result = [];
        let nameResult = this.props.name;
        let maxPriceResult = parseInt(this.props.maxPrice);
        let minPriceResult = parseInt(this.props.minPrice);
        let getInStockResult = this.props.inStock;
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
        }).then(()=>{
            this.setState({
               foundList: this.getItemBasedOnSearchResult()
            })
        })
     }
    componentDidMount(){
        this.fetchItems();
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.name !== this.props.name 
            || prevProps.minPrice !== this.props.minPrice
            || prevProps.maxPrice !== this.props.maxPrice
            || prevProps.inStock !== this.props.inStock
            ){//need to use this to update component when props change, compare the prev props with the current props to stop infinite call of render
            this.setState({
                foundList: this.getItemBasedOnSearchResult()
            });
        }
    }


    render(){
        return(
            <div id="result_display">
                    <h4> we found ({this.state.foundList.length}) result(s)</h4>
                    <div className="sort-container">
                        <span className="sorter-label">Sort by</span>
                        {[...SORT_CRITERIAS].map((item)=>(
                            <Sorter list = {this.state.foundList} valueSort={item.valueSort} name={item.name} setList={this.setList}>

                            </Sorter>
                        )
                        )}
                    </div>
                    { this.state.foundList.length >0 && this.state.foundList? (<Pagination
                      dalist={this.state.foundList}></Pagination>) : ( <div>Not found</div>)}   
            </div>
        );
    }
}

export default ResultDisplay;