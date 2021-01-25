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
            avail: false,
            valid: false,
            validName: true,
            validPrice: true,
        }
        this.onChangeMaxPrice = this.onChangeMaxPrice.bind(this);
        this.onChangeMinPrice = this.onChangeMinPrice.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.checkPriceRange = this.checkPriceRange.bind(this);
        this.handleInStockCheck = this.handleInStockCheck.bind(this);
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
        let val = parseInt(event.target.value);
        
        this.setState({
            maxPrice: val
        })
    }
    onChangeMinPrice = (event) => {
        let val = parseInt(event.target.value);
        this.setState({
            minPrice: val
        })
    }
    checkPriceRange = (event) => { 
        event.stopPropagation();
        let minPrice = parseInt(this.state.minPrice);
        let maxPrice = parseInt(this.state.maxPrice);
        if ( maxPrice === 0 ){
            this.setState({
                validPrice: true,
            })     
        } else {
            this.setState({
                validPrice: maxPrice > minPrice,
            })
        }
       
    }
    handleInStockCheck = (event) => {
        this.setState({
            avail: event.target.checked
        });
    }
    render() {
        return (
            <div id="search_form">
                    <label htmlFor="name">Name</label>
                    <br></br>
                    <span className="input container">
                    <input className={this.state.validName? "" : "not-valid"} type="text" id="name" name="name" value={this.state.name} onChange={this.onChangeName}></input>
                    {   !this.state.validName &&
                        <BiX></BiX>
                    }
                    </span>
                    <br></br>
                    <label htmlFor="maxPrice">Max Price</label>
                    <br></br>
                    <span className="input container">
                    {!this.state.validPrice && <span className="not-valid-price" >Price must be 0 or greater than the minimum price</span>}
                    <input className={this.state.validPrice? "" : "not-valid"}  type="number" id="max_price" name="maxPrice" value={this.state.maxPrice} onChange={this.onChangeMaxPrice} onKeyUp={this.checkPriceRange}></input>
                    {   !this.state.validPrice &&
                        <BiX></BiX>
                    }
                    </span>
                    <br></br>
                    <label htmlFor="minPrice">Min Price</label>
                    <br></br>
                    <span className="input container">
                    <input type="number" id="min_price" name="minPrice" value={this.state.minPrice} onChange={this.onChangeMinPrice} onKeyUp={this.checkPriceRange}></input>
                    </span>
                    <br></br>
                    <label htmlFor="inStock">In stock?</label>
                    <input type="checkbox" value={this.state.avail} onChange={this.handleInStockCheck}></input>
                    <br></br>
                    <button onClick={ (e) => {e.preventDefault(); this.props.onSubmitSearch(this.state.name, this.state.minPrice, this.state.maxPrice, this.state.avail)}} 
                    disabled={!this.state.validName || !this.state.validPrice}>Search</button>
                    {/*to add function reference instead of calling the function directly, 
                    otherwise the setState will be called infinitely within the render methods which might cause loop and max exceed error*/}
            </div>
        );
    }
}

export default SearchForm;
