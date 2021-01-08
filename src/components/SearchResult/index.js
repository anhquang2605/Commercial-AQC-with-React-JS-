import React from 'react';
import SearchForm from './SearchForm';
import Sorter from './Sorter';
import ResultDisplay from './ResultDisplay';
class SearchResult extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.match.params.name,
            type: this.props.match.params.type,
            spec: this.props.match.params.spec,
            dis: this.props.match.params.dis,
            max: 0,
            min: 0,
            inStock: false,
        }
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
    }
    static getDerivedStateFromProps(props,state){//To process props and prepair state for component before mounting for the first time
        if(props.match.params.dis){
            const disRange = props.match.params.dis.split("-");

            return({
                max: parseInt(disRange[1]),
                min: parseInt(disRange[0])
             });
        }
        return null;
    }
    onSubmitSearch(name = "", min = 0, max = 0, inStock = false)  {
        this.setState({
            name: name,
            min: min,
            max: max,
            inStock: inStock
        });
    }
    render(){
        return(
            <div id="search_result">
                
                <SearchForm onSubmitSearch={this.onSubmitSearch} name={this.state.name} type={this.state.type} spec={this.state.spec} min={this.state.min} max={this.state.max}></SearchForm>
                <Sorter></Sorter>
                <ResultDisplay name={this.state.name} minPrice={this.state.min} maxPrice={this.state.max} inStock={this.state.inStock}></ResultDisplay>
            </div>
        );
    }
}

export default SearchResult;