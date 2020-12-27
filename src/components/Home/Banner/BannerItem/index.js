import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../../../Constants/Routes';
class BannerItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            imageRef: this.props.imageRef,
            type: this.props.type,
            specification: this.props.specification,
            discount: this.props.discount ,
            width: this.props.width,
            queueString: 
            ROUTES.SEARCH_RESULT + "?" 
            + "type=" + this.props.type + "&"
            + "spec=" + this.props.specification + "&"
            + "dis=" + this.props.discount[0] + "-" + this.props.discount[1]
        }
    }
    render(){
        return(
            <div className="banner-item" style={{width: this.state.width + "px"}}>
                <Link to={ this.state.queueString}>
                <img src={require('../../../../images/Banners/' + this.state.imageRef)} alt={this.state.name} ></img>
            </Link>
            </div>
        );
    }
}

export default BannerItem;