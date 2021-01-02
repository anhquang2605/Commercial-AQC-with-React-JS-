import React, { Component } from 'react';

class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name? this.props.name : "",
            maxPrice: 0,
            minPrice: 0,
            types: '',
        
        }
    }
    render() {
        return (
            <div id="search_form">
                
            </div>
        );
    }
}

export default SearchForm;
