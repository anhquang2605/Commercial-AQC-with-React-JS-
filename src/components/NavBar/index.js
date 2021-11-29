import React from 'react';
import {Link} from 'react-router-dom';
import * as ITEMS from '../../Constants/NavigationItems';
import './nav-bar.scss';
class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            length: 0
        }
    };
    render() {
        return (
            <ul id="nav_bar">
                {ITEMS.ITEMS.map((item)=>{
                    return (
                        <li key={item.name} value={item.route}>
                            {item.icon && item.icon}
                            <Link to={item.route} >{item.name} </Link> 
                        </li>
                    )
                })}
            </ul>
        )
    }
}
export default NavBar;