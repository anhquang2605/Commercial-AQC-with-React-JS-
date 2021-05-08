import React from 'react';
import OrderWidget from '../../OrderWidget';
import {RiVipDiamondFill} from 'react-icons/ri';
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
                <h4> <RiVipDiamondFill></RiVipDiamondFill> Featured Items <RiVipDiamondFill></RiVipDiamondFill></h4>
                <div className="flex-container">
                    {this.generateItems()}
                </div>
            </div>
        )
    }
}

export default FeaturedItems;