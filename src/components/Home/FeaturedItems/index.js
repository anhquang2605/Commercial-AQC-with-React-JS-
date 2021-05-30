import React from 'react';
import OrderWidget from '../../OrderWidget';
import {AiTwotoneStar} from 'react-icons/ai';
import './feature-items.scss';
class FeaturedItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: this.props.listOfFeatured
        }
        this.generateItems = this.generateItems.bind(this);
    }
    generateItems(){
        let daList = this.state.list;
        let daListComponent = daList.map(ele => {
            return (
                <OrderWidget key={ele.id} value={ele.name} id={ele.id} name={ele.name} quantity={ele.quantity} types={ele.types} price={ele.price}></OrderWidget>
            )
        })
        return daListComponent;
    }
    render() {
        return (
            <div className="FeaturedItems">
                <div className="featured-title"><hr></hr> <div className="inner-flex-container"><AiTwotoneStar></AiTwotoneStar><h4> Featured Items </h4><AiTwotoneStar></AiTwotoneStar> </div> <hr></hr> </div>
                <div className="flex-container">
                    {this.generateItems()}
                </div>
            </div>
        )
    }
}

export default FeaturedItems;