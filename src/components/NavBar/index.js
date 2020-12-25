import React from 'react';
import {Link} from 'react-router-dom';
import * as ITEMS from '../../Constants/NavigationItems';
const ListItems = ITEMS.ITEMS.map((item)=>{
    return (
        <li key={item.name} value={item.route}>
        <Link to={item.route} >{item.name}</Link> 
        </li>
    )
})
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
            <ul>
                {ListItems}
            </ul>
        )
    }
}
export default NavBar;