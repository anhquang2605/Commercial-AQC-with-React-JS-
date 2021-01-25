import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import './search-bar.scss';
import ORDERS from '../../model/Orders';
import {BsSearch} from 'react-icons/bs';
import { BiBody } from 'react-icons/bi';
class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.refSearch = React.createRef();
        this.state = {
            searchQueue: '',
            valid: false,
            hintList: [],
            fullList: [],
            focused: false,
            mouseOvered: false,
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.emptyField = this.emptyField.bind(this);
        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnFocusOut = this.handleOnFocusOut.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    fetchItems = () => {//get list of items here
        /* fetch("ORDERS.json").then( res => res.text() ).then((res)=>{
            var res = JSON.parse(res);
            let newList = res.map((item) => {//only take their names
                return item.name.toLowerCase();
            })
            this.setState({
                fullList: newList
            })
        }); */ // somehow json error input keeps on popping up, might check to solve this later
        
        //Using direct ORDERS FROM models
        let newList = ORDERS.map((item) => {//only take their names
            return item.name.toLowerCase();
        })
        this.setState({
            fullList: newList
        })
    }
    handleOnChange(event){
        this.setState(()=>({
            searchQueue: event.target.value
        }))
        this.hintSearchName(event.target.value);
    }
    handleOnFocus(){
        this.setState(()=>({
            focused: true
        }))
    }
    handleOnFocusOut(){
        if(!this.state.mouseOvered){
            this.setState(()=>({
                focused: false 
              }))
        }  
    }
    handleSearchClick(item){
        
        var promises = new Promise((resolve) => {
            this.setState({
            searchQueue: item})
            resolve();//gotta put this here for resolve result else put refuse if no working, can obmit the refuse
        }
        );
        promises.then(()=>{ //to make sure that the state is updated before trigger click
            this.refSearch.current.click();
        })
    }
    handleMouseOver(){
        this.setState({
            mouseOvered: true,
        })
    }
    handleMouseLeave(){
        this.setState({
            mouseOvered: false,
        })
    }
    hintSearchName(key){
        let hints = [];
        this.state.hintList = [];
        this.state.fullList.forEach((iName)=>{
            if(iName.search(key) >= 0){
                hints.push(iName);
            }
        })
        this.state.hintList = [...new Set(hints)];//ultilzing Set that consist of unique items, then tranform the set back to js array
    }
    emptyField = () => {
        let search_bar_ele = document.getElementById("search_bar");
        let inputSearchField = search_bar_ele.children[0];
        this.setState(()=>({
            searchQueue: inputSearchField.value
        }));
        inputSearchField.value = "";
    }
    componentDidMount = () => {
        if(this.state.fullList.length === 0 ){
            this.fetchItems();
        }
    }
    render() {
        return(
            <div onBlur={this.handleOnFocusOut} id="search_bar">
                <input type="text" value={this.state.searchQueue} onFocus={this.handleOnFocus} onChange={this.handleOnChange}></input>
                <Link ref={ this.refSearch} alt="Search" to={ROUTES.SEARCH_RESULT + "/" + this.state.searchQueue} onClick={this.emptyField}><BsSearch></BsSearch></Link>
                {this.state.hintList.length > 0 && this.state.focused && <div onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} className="hints" >
                    { this.state.hintList.map(item => {
                        return(
                            <span key={item} onClick={(e)=>{
                                e.stopPropagation();
                                this.handleSearchClick(item)}} className="hint-item">{item}</span>
                        )
                    })}
                </div>}
            </div>
        )
    }
}

export default SearchBar;