import React from 'react';
import './logo.scss';
class Logo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imgSrc: this.props.src,
            href: this.props.href
        }
    }
    render(){
        return(
            <a id="company_logo" href={this.state.href}>
                <img alt="AQC comercial" src= {require("./../../images/" + this.state.imgSrc)}/>
            </a>
        )
    }
}

export default Logo;