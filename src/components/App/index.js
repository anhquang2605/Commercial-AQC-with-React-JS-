import React, {useState, useEffect, useContext} from 'react';
import Navigator from '../Navigator';
import Home from '../Home';
import NavBar from '../NavBar';
import SearchBar from '../SearchBar';
import Logo from '../Logo';
import { Route, Switch, useLocation} from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import SearchResult from '../SearchResult';
import OrderDetail from '../OrderDetail';
import ShoppingCart from '../ShoppingCart';
import KartDetail from '../KartDetail';
import CheckOut from '../CheckOut';
import PlaceOrder from '../PlaceOrder';
import ThankYou from "../ThankYou";
import Firebase, {FirebaseContext} from './../Firebase/';
import Shortcut from '../Account/Shortcut';
import Orders from '../Account/Orders';
import Account from '../Account';
import Cards from '../Account/Cards';
import GCards from '../Account/GCards'; 
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
        const [curSearchQ, setCurSearchQ] = useState();
        const [curCard, setCurCard] = useState();
        const [curGCards, setCurGCards] = useState([]);
        const [curShipping, setCurShipping] = useState({});
        const [curTotal, setCurTotal] = useState(0);
        const [account, setAccount] = useState({});
        //const firebasecontext =  useContext(FirebaseContext);
        const db = Firebase.firestore();
        //Ref to Check out component
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
        //Set Gcard, card, and shipping for app from within checkout component
        let getCardFromCheckout = (obj) =>{
            setCurCard(obj);
        }
        let getGCardsFromCheckout = (arr) =>{
            setCurGCards(arr);
            
        }
        let getShippingFromCheckout = (obj) =>{
            setCurShipping(obj);
        }
        let getTotalFromCheckout = (num) =>{
            setCurTotal(num);
        }
        //flush the cart list when user hit place order
        let flushCart = () => {
            setCartList([]);
        }
        useEffect(() => {
            db.collection("accounts").get("anhquang2605").then((datas)=>{
                var account = datas.docs[0].data();
                setAccount(account);
            });
            setPageName(location.pathname);
        });
        return(
            <div className="commercial-AQC">
                <h1>Commercial website AQC</h1>
                <Navigator>
                    <Logo href={ROUTES.HOME} src={'logo.png'}></Logo>
                    <NavBar></NavBar>
                    {account && <Shortcut username={account.nickname || account.username}></Shortcut>}
                    {(pageName.search("/result")) != 0  && <SearchBar></SearchBar>}
                </Navigator>
                {((pageName.search("/kart-detail")!= 0) && (pageName.search("/checkout")!= 0) ) && <ShoppingCart  reRendering={handleRerendering} cartList={cartList} removeItem={removeFromCartList}></ShoppingCart>}
                            <Switch location={location}>
                                <Route  exact path = {ROUTES.HOME} component = {Home}/>
                                <Route  path = {ROUTES.SEARCH_RESULT+"/:name?/:type?/:spec?/:dis?"} component = {SearchResult}/>
                                <Route path = {ROUTES.ORDERS + "/:id"} render={(props) => (<OrderDetail {...props} addItem={addToCartList} reRendering={handleRerendering}></OrderDetail>)}></Route>
                                <Route path = {ROUTES.KART_DETAIL} render={(props) => (<KartDetail {...props} list={cartList} removeItem={removeFromCartList} changeQuantity={handleChangeOfQuantity} rerenderer={handleRerendering}></KartDetail>)}></Route>
                                <Route 
                                    path = {ROUTES.CHECK_OUT} 
                                    render = {(props) => (
                                        <CheckOut {...props}
                                                curGCards={curGCards}  
                                                curCard={curCard} 
                                                curShipping={curShipping}  
                                                setShippingForApp={getShippingFromCheckout} 
                                                setCardForApp={getCardFromCheckout} 
                                                setGCardForApp={getGCardsFromCheckout} 
                                                setTotalForApp={getTotalFromCheckout}
                                                list={cartList}>
                                        </CheckOut>)}>
                                        </Route>
                                <Route path = {ROUTES.PLACE_ORDER} 
                                    render={(props) => (
                                        <PlaceOrder
                                            {...props} 
                                            flushCartList= {flushCart}  
                                            cartList={cartList}
                                            total={curTotal}
                                            shipping={curShipping}
                                            card={curCard}
                                            >
                                        </PlaceOrder>)}>
                                </Route>
                                <Route path = {ROUTES.THANK_YOU} component={ThankYou}></Route>
                                {/* Account Routes  */}
                                <Route exact path = {ROUTES.ACCOUNT} render={(props)=>(
                                    <Account {...props} account={account}>
                                        
                                    </Account>
                                    )}>
                                </Route>
                                <Route path = {ROUTES.ACCOUNT + '/orders'} component={Orders}></Route>
                                <Route path = {ROUTES.ACCOUNT + '/cards'} render={(props)=>(
                                    account.cards ? <Cards {...props} accountID={account.username} list={account.cards}>
                                        
                                    </Cards> : ""
                                    )}></Route>
                                <Route path = {ROUTES.ACCOUNT + '/gcards'} render={(props)=>(
                                    account.gcards? <GCards {...props} accountID={account.username} list={account.gcards}></GCards> : ""
                                )}></Route>
                                    
                                </Switch>
                       
            </div>
        )
} 

export default App;