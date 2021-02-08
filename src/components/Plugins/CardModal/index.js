import React from "react";
import "./card-modal.scss";
class CardModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
        }
    }
    render() {
        return (
            <div className="card-modal" id={"card-modal-for-"+this.state.name}>
                <h5>{this.state.name}</h5>
                {this.props.children}
            </div>
        )
    }
}

export default CardModal;