import React, {useState, useEffect} from 'react';
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
import Firebase, { FirebaseContext } from './../Firebase/';
import Shortcut from '../Account/Shortcut';
import Orders from '../Account/Orders';
import Account from '../Account';
import Cards from '../Account/Cards';
import GCards from '../Account/GCards'; 
import './app.scss';
import SignInUpButtons from '../SignInUpButtons';
import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp'; 
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
        const [user, setUser] = useState("");
        const [pageName, setPageName] = useState('');
        const [,setState] = useState();
        const location = useLocation();
        const [cartList, setCartList] = useState([]);
        const [curCard, setCurCard] = useState();
        const [curGCards, setCurGCards] = useState([]);
        const [curShipping, setCurShipping] = useState({});
        const [curTotal, setCurTotal] = useState(0);
        const [account, setAccount] = useState(null);
        //the date
        let d = new Date();
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
        let addNewItemToUserCart = (account, item) => {
            db.collection("accounts").doc(account).update({
                kart: Firebase.firestore.FieldValue.arrayUnion(item)
            });
        }
        let removeItemFromUserCart = (account, item) => {
            db.collection("accounts").doc(account).update({
                kart: Firebase.firestore.FieldValue.arrayRemove(item)
            })
        }
        let addToCartList = (item) => {
            let inCartSign = isInCart(item.name, item.type);
            if (!inCartSign.found){
                cartList.push(item);
                if(account){
                    addNewItemToUserCart(account.username, item);
                }
            } else {
                var theItem = cartList[inCartSign.index];
                if(account){
                    removeItemFromUserCart(account.username, theItem);
                }
                theItem.quantity += parseInt(item.quantity);
                if(account){
                    addNewItemToUserCart(account.username, theItem)
                }
            }
        }
        let handleRerendering = () =>{
            setState({});
        }
        let addToOrderAfterCheckOut = (tracking) => {
            let proccessedOrders = cartList.map(item=>{
                let day = d.getDate() + 2 + Math.ceil(Math.random()*7);
                let month = d.getMonth() + 1;
                let year = d.getFullYear();
                //Is there a better way to this?
                if (month === 1,3,5,7,8,10,12){
                    if(day > 31){
                        day = day - 31;
                        month +=1;
                    }
                    if(month > 12){
                        month = month - 12;
                        year += 1;
                    }
                } else if( month === 2) {
                    if(day > 28){
                        day = day - 28;
                        month +=1;
                    }
                } else {
                    if(day > 30){
                        day = day - 30;
                        month +=1;
                    }
                }
                return {
                    ...item,
                    arrival: month + "-" + day + "-" + year,
                }              
            })
            let daOrder = {
                trackingID: tracking,
                orderList: proccessedOrders,
                orderDay: d.getDate(),
                orderMonth: d.getMonth() + 1,
                orderYear: d.getFullYear()
            }
            db.collection("accounts").doc(account.username).update({
                orders: Firebase.firestore.FieldValue.arrayUnion(daOrder)
            });
            //reset account so that order is updated after checking out, is there a better way?
            db.collection("accounts").get(account.username).then((datas)=>{
                //Set account and kart after accessing database is fine
                var account = datas.docs[0].data();
                setAccount(account);
            })    
        }
        let removeFromCartList = (itemIndex) => {
            if (account!= undefined){
                removeItemFromUserCart(account.username, cartList[itemIndex]);
            }
            let newList = cartList.slice(0,itemIndex).concat(cartList.slice(itemIndex + 1, cartList.length));
            setCartList(newList);
        }
        let handleChangeOfQuantity = (index,val) =>{
            if (val === 0) removeFromCartList(index);
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
            if(account!==undefined,null){
                db.collection("accounts").doc(account.username).update({
                    kart: []
                })
            }
        }
        useEffect(() => {
            if(user!==""){//IF THERE IS USER
                db.collection("accounts").get(user).then((datas)=>{
                    //Set account and kart after accessing database is fine
                    var account = datas.docs[0].data();
                    setAccount(account);
                    setCartList(account.kart);
                })
            } 
            setPageName(location.pathname);
        },[]);
        useEffect(()=>{//keep track of paths
            setPageName(location.pathname);
        },[location])
        return(
            <div className="commercial-AQC">
                <h1>Commercial website AQC</h1>
                { (pageName.search("sign-in") === -1 && pageName.search("sign-up") === -1) && <Navigator>
                    <Logo href={ROUTES.HOME} src={'logo.png'}></Logo>
                    <NavBar></NavBar>
                    
                    {account && <Shortcut username={account.nickname || account.username}></Shortcut>}
                    {(pageName.search("result")) === -1  && <SearchBar></SearchBar>}
                    {!user && <SignInUpButtons></SignInUpButtons>}
                </Navigator>}
                {((pageName.search("/kart-detail")!== 0) && (pageName.search("/checkout")!== 0) ) && <ShoppingCart  reRendering={handleRerendering} cartList={cartList} removeItem={removeFromCartList}></ShoppingCart>}
                            <Switch location={location}>
                                <Route  exact path = {ROUTES.HOME} component = {Home}/>
                                <Route  path = {ROUTES.SEARCH_RESULT+"/:name?/:type?/:spec?/:dis?"} component = {SearchResult}/>
                                <Route path = {ROUTES.ORDERS + "/:id"} render={(props) => (<OrderDetail {...props} addItem={addToCartList} reRendering={handleRerendering}></OrderDetail>)}></Route>
                                <Route path = {ROUTES.KART_DETAIL} render={(props) => (<KartDetail {...props} list={cartList} removeItem={removeFromCartList} changeQuantity={handleChangeOfQuantity} rerenderer={handleRerendering}></KartDetail>)}></Route>
                                <Route 
                                    path = {ROUTES.CHECK_OUT} 
                                    render = {(props) => (
                                        <CheckOut {...props}
                                                account={account}
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
                                            cartList={cartList}
                                            total={curTotal}
                                            shipping={curShipping}
                                            card={curCard}
                                            >
                                        </PlaceOrder>)}>
                                </Route>
                                <Route path = {ROUTES.THANK_YOU} render={(props)=>(
                                    <ThankYou {...props} account={account} flushCart={flushCart} addToOrderAfterCheckOut={addToOrderAfterCheckOut}>
                                    </ThankYou>
                                    )}></Route>
                                {/* Account Routes  */}
                                <Route exact path = {ROUTES.ACCOUNT} render={(props)=>(
                                    <Account {...props} account={account}>
                                        
                                    </Account>
                                    )}>
                                </Route>
                                <Route path = {ROUTES.ACCOUNT + '/orders'} render={(props)=>(
                                    account.orders ? <Orders {...props} ordersOfAccount={account.orders}></Orders> : <span className="no-order">No order found</span>
                                )}></Route>
                                <Route path = {ROUTES.ACCOUNT + '/cards'} render={(props)=>(
                                    account.cards ? <Cards {...props} accountID={account.username} list={account.cards}>
                                        
                                    </Cards> : ""
                                    )}></Route>
                                <Route path = {ROUTES.ACCOUNT + '/gcards'} render={(props)=>(
                                    account.gcards? <GCards {...props} accountID={account.username} list={account.gcards}></GCards> : ""
                                )}></Route>
                                <Route path ={ROUTES.SIGN_IN} component={SignIn}/>
                                <Route path ={ROUTES.SIGN_UP} component={SignUp}/>
                                </Switch>
                       
            </div>
        )
} 

export default App;