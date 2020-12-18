import React from 'react';

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
            <a href={this.state.href}>
                <img src= {this.state.imgSrc}/>
            </a>
        )
    }
}

export default Logo;