import React from 'react';
import './controller.css' ;
class Controller extends React.Component {
    render(){
        return(
            <div className="controller">
                <span className="left-controller-banner">Left</span>
                <span className="right-controller-banner">Right</span>
            </div>
        );
    }
}

export default Controller;