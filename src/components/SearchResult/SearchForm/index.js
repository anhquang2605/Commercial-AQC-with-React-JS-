import React, { Component } from 'react';
import './search-form.css';
import {BiX} from 'react-icons/bi';
class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name? this.props.name.replaceAll("_"," "): "",
            maxPrice: 0,
            minPrice: 0,
            types: '',
            avail: true,
            valid: false,
            validName: true,
        }
        this.onChangeMaxPrice = this.onChangeMaxPrice.bind(this);
        this.onChangeMinPrice = this.onChangeMinPrice.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.searchResult = this.searchResult.bind(this);
    }
    onChangeName = (event) => {
        let val = event.target.value;
        if (val.length > 50 || val == ""){
            this.setState({
                validName: false,
            })
        } else {
            this.setState({
                validName: true,
            })
        }
        this.setState(()=>({
            name: val
        }));
    }
    onChangeMaxPrice = (event) => {
        let val = event.target.value;
        this.setState({
            maxPrice: event.target.value
        })
    }
    onChangeMinPrice = (event) => {
        let val = event.target.value;
        this.setState({
            minPrice: event.target.value
        })
    }
    searchResult = () => {
        return 0;
    }
    render() {
        return (
            <div id="search_form">
                <form>
                    <label for="name">Name</label>
                    <br></br>
                    <span className="input container">
                    <input className={this.state.validName? "" : "not-valid"} type="text" id="name" name="name" value={this.state.name} onChange={this.onChangeName}></input>
                    {   !this.state.validName &&
                        <BiX></BiX>
                    }
                    </span>
                    <br></br>
                    <label for="maxPrice">Max Price</label>
                    <br></br>
                    <span className="input container">
                    <input  type="number" id="max_price" name="maxPrice" value={this.state.maxPrice} onChange={this.onChangeMaxPrice}></input>
                    </span>
                    <br></br>
                    <label for="minPrice">Min Price</label>
                    <br></br>
                    <span className="input container">
                    <input type="number" id="min_price" name="minPrice" value={this.state.minPrice} onChange={this.onChangeMinPrice}></input>
                    </span>
                    <br></br>
                    <label for="inStock">In stock?</label>
                    <input type="checkbox"></input>
                    <br></br>
                    <button onClick={this.searchResult} disabled={!this.state.validName}>Search</button>
                </form>
            </div>
        );
    }
}

export default SearchForm;
