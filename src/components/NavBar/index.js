import React from 'react';
import PropTypes from 'prop-types';
import LinkTo from "./linksTo";
const dalists = [
    {
        id:"1",
        href: "/home",
        name: "Home Page"
    },{
        id:"2",
        href: "/orders",
        name: "Your Orders"
    },{
        id:"3",
        href: "/cusService",
        name: "Customer Service"
    },{
        id:"4",
        href: "/account",
        name: "Customer Service"
    },{
        id:"5",
        href: "/",
        name: "Categories"
    }
]
const ListItems = dalists.map((dalist)=>{
    return (
        <LinkTo key={dalist.id} value={dalist.href} href={dalist.href} id={dalist.id} name={dalist.name}></LinkTo> 
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