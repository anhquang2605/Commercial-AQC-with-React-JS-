import React from 'react';

class LinkTo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            href: this.props.href,
            name: this.props.name
        }
    }
    render(){
        return(
            <li>
                <a href={this.state.href}>{this.state.name}</a>
            </li>
        )
    }
}

export default LinkTo;