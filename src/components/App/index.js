import React, {useState, useEffect} from 'react';
import Navigator from '../Navigator';
import Home from '../Home';
import NavBar from '../NavBar';
import SearchBar from '../SearchBar';
import Logo from '../Logo';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import SearchResult from '../SearchResult';
import OrderDetail from '../OrderDetail';
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
const App = () =>  {
        const [pageName, setPageName] = useState('');
        const location = useLocation();
        useEffect(() => {
            setPageName(location.pathname)
        });
        return(
            <div className="commercial-AQC">
                <h1>Commercial website</h1>
                <Navigator>
                    <Logo href={ROUTES.HOME}></Logo>
                    <NavBar></NavBar>
                    {(pageName.search("/result")) != 0  && <SearchBar></SearchBar>}
                </Navigator>
                <Switch>
                    <Route  exact path = {ROUTES.HOME} component = {Home}/>
                    <Route  path = {ROUTES.SEARCH_RESULT+"/:name?/:type?/:spec?/:dis?"} component = {SearchResult}/>
                    <Route path = {ROUTES.ORDERS + "/:id"} component={OrderDetail}></Route>
                </Switch>
            </div>
        )

} 

export default App;