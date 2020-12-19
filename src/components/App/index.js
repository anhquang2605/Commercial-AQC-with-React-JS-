import React from 'react';
import Header from '../Header';
import ORDERS from '../../model/index';
import FeaturedItems from '../FeaturedItems';
const listOfFeatured = [];
 
ORDERS.forEach(ele => {
    if(ele.featured){
        listOfFeatured.push(ele);
    }
})
console.log(listOfFeatured);
class App extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>Commercial website</h1>
                <Header/>
                <FeaturedItems listOfFeatured={listOfFeatured}></FeaturedItems>
            </div>
        )
    }
} 

export default App;