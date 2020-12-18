import React from 'react';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchQueue: '',
            valid: false
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    handleOnSubmit(event){
        event.prevenDefault();
        this.setState(()=>({
            searchQueue: event.target.value
        }))
    }
    handleOnChange(event){
        this.setState(()=>({
            searchQueue: event.target.value
        }))
    }
    render() {
        return(
            <form type="submit">
                <input type="text" value={this.state.searchQueue} onChange={this.handleOnChange}></input>
                <button type="submit" onClick={this.handleOnSubmit}>Search</button>
            </form>
        )
    }
}

export default SearchBar;