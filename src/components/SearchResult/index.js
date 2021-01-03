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
        }
    }
    static getDerivedStateFromProps(props,state){//To process props and prepair state for component before mounting for the first time
        const disRange = props.match.params.dis.split("-");

       return({
            max: parseInt(disRange[1]),
            min: parseInt(disRange[0])
        });
    }
    render(){
        return(
            <div id="search_result">
                
                <SearchForm name={this.state.name} type={this.state.type} spec={this.state.spec} min={this.state.min} max={this.state.max}></SearchForm>
                <Sorter></Sorter>
                <ResultDisplay></ResultDisplay>
            </div>
        );
    }
}

export default SearchResult;