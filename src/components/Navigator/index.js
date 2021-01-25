import React from 'react';
import * as ROUTES from '../../Constants/Routes'
import './navigator.scss';
class Navigator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            routes: ROUTES
        }
    }
    componentDidMount = () => {
        window.addEventListener("scroll", this.handleStickyScroll);
    }
    componentWillUnmount = () => {
        window.removeEventListener("scroll", this.handleStickyScroll);
    }
    handleStickyScroll = () => {
        var header = document.getElementById("header");
        var headerOffSet = header.offsetTop;
        if(window.pageYOffset > headerOffSet){
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
    render() {
        return(
            <div id="header">
                {this.props.children}
            </div>
        )
    }
}
export default Navigator;