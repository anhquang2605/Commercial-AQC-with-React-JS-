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
import ShoppingCart from '../ShoppingCart';
import KartDetail from '../KartDetail';
import './app.scss';
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
const App = (props) =>  {
        const [pageName, setPageName] = useState('');
        const [,setState] = useState();
        const location = useLocation();
        const [cartList, setCartList] = useState([]);
        let isInCart = (name, type) =>{
            var i = 0;
            var length = cartList.length;
            for (i; i < length; i+=1){
                var theItem = cartList[i] 
                if(theItem.name === name && theItem.type === type ){
                    return {found: true, index: i};
                }
            }
            return {found:false, index: 0};    
        }
        let addToCartList = (item) => {
            let inCartSign = isInCart(item.name, item.type);
            if (!inCartSign.found){
                cartList.push(item);
            } else {
                cartList[inCartSign.index].quantity += parseInt(item.quantity);
            }
        }
        let handleRerendering = () =>{
            setState({});
        }
        let removeFromCartList = (itemIndex) => {
            let newList = cartList.slice(0,itemIndex).concat(cartList.slice(itemIndex + 1, cartList.length));
            setCartList(newList);
        }
        let handleChangeOfQuantity = (index,val) =>{
            if (val == 0) removeFromCartList(index);
            else  cartList[index].quantity = val;
        }

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
                {pageName.search("/kart-detail") != 0 && <ShoppingCart  reRendering={handleRerendering} cartList={cartList} removeItem={removeFromCartList}></ShoppingCart>}
                <Switch>
                    <Route  exact path = {ROUTES.HOME} component = {Home}/>
                    <Route  path = {ROUTES.SEARCH_RESULT+"/:name?/:type?/:spec?/:dis?"} component = {SearchResult}/>
                    <Route path = {ROUTES.ORDERS + "/:id"} render={(props) => (<OrderDetail {...props} addItem={addToCartList} reRendering={handleRerendering}></OrderDetail>)}></Route>
                    <Route path = {ROUTES.KART_DETAIL} render={(props) => (<KartDetail {...props} list={cartList} removeItem={removeFromCartList} changeQuantity={handleChangeOfQuantity} rerenderer={handleRerendering}></KartDetail>)}></Route>
                </Switch>
            </div>
        )
} 

export default App;