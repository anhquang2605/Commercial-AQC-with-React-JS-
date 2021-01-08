import React from 'react';
import * as ROUTES from '../../Constants/Routes'
class Navigator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            routes: ROUTES
        }
    }
    render() {
        return(
            <div className="header">
                {this.props.children}
            </div>
        )
    }
}
export default Navigator;