import React from 'react';
import NavBar from '../NavBar';
import SearchBar from '../SearchBar';
import Logo from '../Logo';
import * as ROUTES from '../../Constants/Routes'
class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div className="header">
                <Logo href={ROUTES.HOME}></Logo>
                <NavBar></NavBar>
                <SearchBar></SearchBar>
            </div>
        )
    }
}
export default Header;