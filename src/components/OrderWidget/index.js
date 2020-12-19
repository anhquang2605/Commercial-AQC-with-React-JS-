import React from 'react';
import silver from './../../images/silver.png';
let imgs = "./silver.png";
class OrderWidget extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            quantity: this.props.quantity,
            inStock: this.props.quantity > 0,
            types: this.props.types,
        }
    }
    imageGetter(id) {
        return id + '-' + this.state.types[0] + ".jpg";
    }
    render(){
        return(
            <a className="Widget" disabled={this.state.inStock} href={"/Order/" + this.state.id}>
                <div className="OutOfStock" hidden={this.state.inStock}>Out of stock</div>
                <img alt={this.state.name} className="WidgetImage" src={require('./../../images/' + this.imageGetter(this.state.id))}></img>
                <span className="ProductNameWidget">{this.state.name}</span>
            </a>
        )
    }
}
//for require to work with src path, needs to go to node_module/react_scripts/webpack.config.js to find "url-loader" config then add or change esModule in option to false
export default OrderWidget;