import React, {useState,useEffect} from 'react';
import Payment from './Payment';
import ItemsSummary from './ItemsSummary';
import ShippingInfo from './ShippingInfo';
import PriceTotal from './PriceTotal';
import firebase from '../../firebase.js';
import './check-out.scss';
const db = firebase.firestore();
const CheckOut = (props) => {
    let [dis, setDis] = useState(0);
    let [debitDis, setDebitDis] = useState(0);
    let [card, setCard] = useState();
    let [cards, setCards] = useState();
    let getDis = (percentage = 0) => {
        setDis(percentage)
    }  
    let getDebitDis = (ammount = 0) => {
        setDebitDis(ammount);
    } 
    let fetchCardsData = () =>{//fetch data from firestore then process it and import it into the cards state of checkout component as well as setting the initial card state
        db.collection("cards").get().then(dat=>{
            var daColection = dat.docs;
            var daList = [];
            daColection.forEach(doc=>{
                daList.push(doc.data());
            });
            var promise = new Promise(resolve => {
                //set state at once through props or avail model
                setCards(daList)
                setCard(daList["0"]);
                resolve();
            });
            promise.then(()=>{
                console.log(card);
            })
        });
    }
    let setMyCard = (id) => {
        setCard(cards[id]);
    }
    useEffect(() => {
        //getting data from firestone for the first time
       fetchCardsData();
    }, []);
    return (
        <div id="check_out">
            <div className="left-container">
                <ShippingInfo></ShippingInfo>
                {card && cards && <Payment setMyCard={setMyCard} card={card} cards={cards} getDis={getDis} getDebitDis={getDebitDis}></Payment>}
                <ItemsSummary list={props.list}></ItemsSummary>
            </div>
            <div className="right-container">
                <PriceTotal dis={dis} debit={debitDis}  list={props.list}></PriceTotal>
            </div>
            
        </div>
    );
}

export default CheckOut;
