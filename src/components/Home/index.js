import React from 'react';
import FeaturedItems from './FeaturedItems';
import ORDERS from '../../model/Orders';
import Banner from './Banner';
const LISTOFFEATURED = [];
 
ORDERS.forEach(ele => {
    if(ele.featured){
       LISTOFFEATURED.push(ele);
    }
});
class Home extends React.Component{
    render(){
        return(
            <div className="Home_Page">
                <Banner></Banner>
                <FeaturedItems listOfFeatured={LISTOFFEATURED}></FeaturedItems>
            </div>
        )
    }
}

export default Home;