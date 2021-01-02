import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchQueue: '',
            valid: false
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnChange(event){
        this.setState(()=>({
            searchQueue: event.target.value
        }))
    }
    render() {
        return(
            <div id="search_bar">
                <input type="text" value={this.state.searchQueue} onChange={this.handleOnChange}></input>
                <Link to={ROUTES.SEARCH_RESULT + "/" + this.state.searchQueue}>Search</Link>
            </div>
        )
    }
}

export default SearchBar;