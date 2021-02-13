import React, { Component } from 'react';
import "./hoz-box.scss";
class HozBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            imgSrc: props.imgSrc,
            title: props.title,
            content: props.content,
        }
    }
    render() {
        return (
                <div className="hoz-order-box">
                    <img src={require("./../../../images/" + this.state.imgSrc)}></img>
                    <div className="box-content">
                        <span className="order-name">{this.state.title}</span>
                        <div className="order-content">{this.state.content}</div>
                        {this.props.extraContent &&(
                            this.props.extraContent
                        )}
                    </div>
                </div>

        );
    }
}

export default HozBox;
