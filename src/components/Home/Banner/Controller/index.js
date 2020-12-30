import React from 'react';
import './controller.css' ;
class Controller extends React.Component {
    render(){
        return(
            <div className="controller">
                <button className="left-controller-banner">Left</button>
                <button className="right-controller-banner">Right</button>
            </div>
        );
    }
}

export default Controller;