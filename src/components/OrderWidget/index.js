import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import './order-widget.css';
class OrderWidget extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            quantity: this.props.quantity,
            inStock: this.props.quantity > 0,
            types: this.props.types,
            price: this.props.price,
        }
    }
    imageGetter(id) {
        return id + '-' + this.state.types[0] + ".jpg";
    }
    render(){
        return(
            <div className="widget" disabled={this.state.inStock} href={"/Order/" + this.state.id}>
                <div className="out-of-stock" hidden={this.state.inStock}>Out of stock</div>
                <Link to={ROUTES.ORDERS + "/" + this.state.id}>
                    <img alt={this.state.name} className="widget-image" src={require('./../../images/' + this.imageGetter(this.state.id))}></img>
                </Link>
                <div className="widget-info">
                    <span className="widget-item-name">{this.state.name}</span><br></br>
                    <span className="price-tag">$ {this.state.price}</span>
                </div>
            </div>
        )
    }
}
//for require to work with src path, needs to go to node_module/react_scripts/webpack.config.js to find "url-loader" config then add or change esModule in option to false
export default OrderWidget;