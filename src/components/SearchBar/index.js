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
        this.emptyField = this.emptyField.bind(this);
    }
    handleOnChange(event){
        this.setState(()=>({
            searchQueue: event.target.value
        }))
    }
    emptyField = () => {
        let search_bar_ele = document.getElementById("search_bar");
        let inputSearchField = search_bar_ele.children[0];
        this.setState(()=>({
            searchQueue: inputSearchField.value
        }));
        inputSearchField.value = "";
    }
    render() {
        return(
            <div id="search_bar">
                <input type="text" value={this.state.searchQueue} onChange={this.handleOnChange}></input>
                <Link to={ROUTES.SEARCH_RESULT + "/" + this.state.searchQueue} onClick={this.emptyField}>Search</Link>
            </div>
        )
    }
}

export default SearchBar;