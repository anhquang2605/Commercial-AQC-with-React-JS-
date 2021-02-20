import React, {useState,useEffect, useImperativeHandle} from 'react';
import Payment from './Payment';
import ItemsSummary from './ItemsSummary';
import ShippingInfo from './ShippingInfo';
import PriceTotal from './PriceTotal';
import firebase from './../Firebase/firebase.js';
import './check-out.scss';
const db = firebase.firestore();
const CheckOut = React.forwardRef((props, ref) => {
    let [dis, setDis] = useState();
    let [debitDis, setDebitDis] = useState();
    let [card, setCard] = useState(props.curCard);
    let [gcards, setGcards] = useState(props.curGCards);
    let [shipping, setShipping] = useState(props.curShipping);
    let [total, setTotal] = useState();
    let [cards, setCards] = useState();
    let [noOfCards, setNoOfCard] = useState(0);
    let getDis = (percentage = 0) => {
        setDis(percentage)
    }  
    let getDebitDis = (ammount = 0) => {
        setDebitDis(ammount);
    } 
    let fetchCardsData = (id) =>{//fetch data from firestore then process it and import it into the cards state of checkout component as well as setting the initial card state
        db.collection("cards").get().then(dat=>{
            var daColection = dat.docs;
            var daList = [];
            var cardsNo = 0;
            daColection.forEach(doc=>{
                cardsNo += 1;
                daList.push(doc.data());
            });
            var promise = new Promise(resolve => {
                //set state at once through props or avail model
                setNoOfCard(cardsNo);
                setCards(daList);
                setCard(daList[id]);
                resolve();
            });
        });
    }
    let addCardToDb = (obj) => { //add card to the collection
        obj.id =  parseInt(noOfCards).toString();
        db.collection("cards").doc(obj.id).set(obj).then(()=>{
        //once added, fetch the cards data again and set the current card to newly added card
            db.collection("cards").doc(obj.id).get().then((data)=>{
                var newCard = data.data(); //don't forget .data() method to get actual data
                setCard(newCard);
                setCards(prevState => [...prevState, newCard]);//add new object to the list
            });
        }).catch((error)=>{
            console.error("Error writting document: ", error)
        }); 
    }
    let setMyCard = (id) => {
        setCard(cards[id]);
    }
    //Get total price info from total price component
    let getTotalFromWithinPriceTotalComp = (num) => {
        setTotal(num);
        props.setTotalForApp(num);
    }
    useEffect(() => {
        //getting data from firestone for the first time
       if(card === undefined){
           fetchCardsData(0);
       } else {
           fetchCardsData(card.id);
       }
        
    }, []);
    useEffect(()=>{
        props.setCardForApp(card);
    }, [card])
    useImperativeHandle(ref, ()=>({
       
    }))
    return (
        <div id="check_out">
            <div className="left-container">
                <ShippingInfo curShipping={shipping} setShippingForApp={props.setShippingForApp}></ShippingInfo>
                {card && cards && <Payment  addCardToDb={addCardToDb} setMyCard={setMyCard} card={card} cards={cards} gcards={props.curGCards} setGCardForApp={props.setGCardForApp} getDis={getDis} getDebitDis={getDebitDis}></Payment>}
                <ItemsSummary list={props.list}></ItemsSummary> 
            </div>
            <div className="right-container">
                <PriceTotal setTotalForCheckOut = {getTotalFromWithinPriceTotalComp} dis={dis} debit={debitDis}  list={props.list}></PriceTotal>
            </div>
            
        </div>
    );
})

export default CheckOut;
