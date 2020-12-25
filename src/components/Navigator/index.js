import React from 'react';
import NavBar from '../NavBar';
import SearchBar from '../SearchBar';
import Logo from '../Logo';
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
                <Logo href={ROUTES.HOME}></Logo>
                <NavBar></NavBar>
                <SearchBar></SearchBar>
            </div>
        )
    }
}
export default Navigator;