import React from 'react';
import Navigator from '../Navigator';
import Home from '../Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import * as NAVITEMS from "../../Constants/NavigationItems";
/*const PageComponents = {
    Home: Home,
    Order: Order,
    Account: Account,
    KartDetail: KartDetail,
    CustomerService: CustomerService
}
/*const  LISTOFROUTES = NAVITEMS.ITEMS.map((item)=>{
    const TagName = item.name.split(' ').join('')
    if(item.name == "Home"){
        return <Route key={item.name} value ={item.route} exact path = {item.route} component={Home}/>
    } else {
        return <Route key={item.name} value ={item.route} path = {item.route} component={Home}/>
    }
}
);*/
class App extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
        <Router>
            <div className="commercial-AQC">
                <h1>Commercial website</h1>
                <Navigator></Navigator>
                <Route exact path = {ROUTES.HOME} component = {Home}/>
            </div>
        </Router>
        )
    }
} 

export default App;