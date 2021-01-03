import React from 'react';
import OrderWidget from '../../OrderWidget';
class FeaturedItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: this.props.listOfFeatured
        }
        this.generateItems = this.generateItems.bind(this);
    }
    generateItems(){
        let size = this.state.list.length;
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
                <h3>Featured Items</h3>
                {this.generateItems()}
            </div>
        )
    }
}

export default FeaturedItems;