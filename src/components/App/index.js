import React, {useState, useEffect} from 'react';
import Navigator from '../Navigator';
import Home from '../Home';
import NavBar from '../NavBar';
import SearchBar from '../SearchBar';
import { Route, Switch, useLocation, useHistory, Link} from 'react-router-dom';
import * as ROUTES from '../../Constants/Routes';
import SearchResult from '../SearchResult';
import OrderDetail from '../OrderDetail';
import ShoppingCart from '../ShoppingCart';
import KartDetail from '../KartDetail';
import CheckOut from '../CheckOut';
import PlaceOrder from '../PlaceOrder';
import ThankYou from "../ThankYou";
import Firebase from './../Firebase/';
import Shortcut from '../Account/Shortcut';
import Orders from '../Account/Orders';
import Account from '../Account';
import Cards from '../Account/Cards';
import GCards from '../Account/GCards'; 
import './app.scss';
import SignInUpButtons from '../SignInUpButtons';
import SignIn from '../Account/SignIn';
import SignUp from '../Account/SignUp'; 
import CustomerService from '../CustomerService';
import ProtectedRoute from '../Plugins/ProtectedRoute';
import Help from '../CustomerService/Help';
import Footer from '../Footer';
import ContactUs from '../ContactUs';
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
        //const [user, setUser] = useState("hellosunshine");//set account here to test
        const [pageName, setPageName] = useState('');
        const [,setState] = useState();
        const location = useLocation();
        const [cartList, setCartList] = useState([]);
        const [curCard, setCurCard] = useState();
        const [curGCards, setCurGCards] = useState([]);
        const [curShipping, setCurShipping] = useState({});
        const [curTotal, setCurTotal] = useState(0);
        const [account, setAccount] = useState(null);
        const history = useHistory();
            //for testing purpose
        //the date
        let d = new Date();
        //const firebasecontext =  useContext(FirebaseContext);
        const db = Firebase.firestore();
        //set user for app upon finish signing in
        let setUserForApp = (u) => {
            setUser(u)
        }
        //Signing out
        let removeAccountFromApp = (e) => {
            e.preventDefault();
            setUser("");
            setAccount(null);
            setCartList([]);
            history.push("");
        }
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
            if(account!==null){
                db.collection("accounts").doc(account.username).update({
                    kart: []
                })
            }
        }
        //for component that add, edit and delete their data
        let reFetchAccount = () =>{
            if(user !== "" && user !== undefined){
                db.collection("accounts").doc(user).onSnapshot((datas)=>{//use on Snap shot for real time data getting, else use get().then().
                    //Using get()then() might return undefined for a real time data query
                    //Set account and kart after accessing database is fine
                    if (datas.exists){
                        var account = datas.data();
                        setAccount(account);
                        setCartList(account.kart);
                    } else {
                        console.log("no data receive please try again");
                    }
                }) 
            }     
        }
        useEffect(() => {
            if(user!==""){//IF THERE IS USER
                db.collection("accounts").doc(user).get().then((datas)=>{
                    //Set account and kart after accessing database is fine
                    var account = datas.data();
                    setAccount(account);
                    setCartList(account.kart);
                }) 
            } 
            setPageName(location.pathname);
        },[]);
        useEffect(()=>{//keep track of paths
            setPageName(location.pathname);
        },[location]);
        useEffect(()=>{
            if(user!==""){
                db.collection("accounts").doc(user).get().then((datas)=>{
                    //Set account and kart after accessing database is fine
                    var account = datas.data();
                    setAccount(account);
                    setCartList(account.kart);
                }) 
            }
        },[user])
        return(
            <div className="commercial-AQC">
                <div className="content">
                <div className="top-header">
                    <h1 className="site-heading"><Link to="/">Commercial website AQC</Link></h1> 
                    {(pageName.search("result")) === -1  && 
                    <SearchBar></SearchBar>}
                </div>
                {(pageName.search("sign-in") === -1 && pageName.search("sign-up") === -1) && 
                <Navigator>
                    {/* <Logo href={ROUTES.HOME} src={'logo.png'}></Logo> */}
                    <NavBar></NavBar>            
                    {(JSON.stringify(account) !== JSON.stringify({}) && account !== null && account !== undefined) && 
                    <Shortcut username={account.nickname || account.username}></Shortcut>}
                    <SignInUpButtons user={user} removeAccount={removeAccountFromApp}></SignInUpButtons>
                </Navigator>}
                {((pageName.search("/kart-detail")!== 0) && (pageName.search("/checkout")!== 0) && (pageName.search("/sign-up")!== 0) && (pageName.search("/sign-in")!== 0) ) && <ShoppingCart  reRendering={handleRerendering} cartList={cartList} removeItem={removeFromCartList}></ShoppingCart>}
                <Switch location={location}>
                    <Route  exact path = {ROUTES.HOME} component = {Home}/>
                    <Route  path = {ROUTES.SEARCH_RESULT+"/:name?/:type?/:spec?/:dis?"} component = {SearchResult}/>
                    <Route path = {ROUTES.ORDERS + "/:id"} render={(props) => (<OrderDetail {...props} addItem={addToCartList} reRendering={handleRerendering}></OrderDetail>)}></Route>
                    <Route path = {ROUTES.KART_DETAIL} render={(props) => (<KartDetail {...props} list={cartList} removeItem={removeFromCartList} changeQuantity={handleChangeOfQuantity} rerenderer={handleRerendering}></KartDetail>)}></Route>
                    <Route 
                        path = {ROUTES.CHECK_OUT} 
                        render = {(props) => (
                            <CheckOut {...props}
                                    reFetch={reFetchAccount}
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
                    <ProtectedRoute exact path = {ROUTES.ACCOUNT} account={account} component={
                        <Account {...props} refetchAccount={reFetchAccount} account={account}>

                        </Account>
                    }>
                    </ProtectedRoute>
                    <ProtectedRoute path = {ROUTES.ACCOUNT + '/orders'} account={account} component ={
                        account && account.orders ? <Orders {...props} ordersOfAccount={account.orders}></Orders> : <span className="no-order">No order found</span>
                    }></ProtectedRoute>
                    <ProtectedRoute path = {ROUTES.ACCOUNT + '/cards'} account={account} component ={
                        account && account.cards ? <Cards reFetch={reFetchAccount} {...props} accountID={account.username} list={account.cards}>
                            
                        </Cards> : ""
                        }></ProtectedRoute>
                    <ProtectedRoute path = {ROUTES.ACCOUNT + '/gcards'} account={account} component ={
                        account && account.gcards? <GCards reFetch={reFetchAccount} {...props} accountID={account.username} list={account.gcards}></GCards> : ""
                    }></ProtectedRoute>
                    <Route path ={ROUTES.SIGN_IN} render={(props)=>(
                            <SignIn {...props} setUserForApp = {setUserForApp}>

                        </SignIn>
                    )}/>
                      <Route path ={ROUTES.SIGN_UP} component={SignUp}/>
                    <Route exact path = {ROUTES.CUSTOMER} component={CustomerService}></Route>
                    <Route path = {ROUTES.CUSTOMER + ROUTES.HELP  + "/:section?/:sub?"} component={Help}></Route>
                    <Route path = {ROUTES.CONTACT_US} render={(props)=>(
                        <ContactUs {...props} account={account}>
                        </ContactUs>
                    )}/>
                </Switch>
                </div>
                <Footer></Footer>   
                       
            </div>
        )
} 

export default App;