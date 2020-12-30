import React from 'react';
import './Pagination.css';
function Pagedot(props) {
    return(
        <a href="#" className={"page-dot" + (props.index == 0? " current" : "")} index={props.index}>
        </a>
    )

};
class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            NoOfItems: this.props.NoOfItems,
            current: 0,
            next: this.props.NoOfItems - 1,
            prev: 0,
        }
    }
    generateUI(){
        var i = 0;
        var max = this.state.NoOfItems;
        var items = [];
        for(i; i < max; i+=1){
            items.push(<Pagedot key={i} index={i}></Pagedot>);
        }
        return items;   
    }
    render() {
        return(
            <div className="Pagination">
                {this.generateUI()}
            </div>
        );
    }
}
export default Pagination;