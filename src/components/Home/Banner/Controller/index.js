import React, { Fragment } from 'react';
import {CgArrowLongLeftR, CgArrowLongRightR} from 'react-icons/cg';
import './controller.css' ;
class Controller extends React.Component {
    render(){
        return(
            <Fragment>
                <button className="left-controller-banner"><CgArrowLongLeftR></CgArrowLongLeftR></button>
                <button className="right-controller-banner"><CgArrowLongRightR></CgArrowLongRightR></button>
            </Fragment>
        );
    }
}

export default Controller;