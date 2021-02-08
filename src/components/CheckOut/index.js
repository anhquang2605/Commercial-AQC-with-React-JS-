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
    let [noOfCards, setNoOfCard] = useState(0);
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
            var cardsNo = 0;
            daColection.forEach(doc=>{
                cardsNo += 1;
                daList.push(doc.data());
            });
            var promise = new Promise(resolve => {
                //set state at once through props or avail model
                setNoOfCard(cardsNo);
                setCards(daList)
                setCard(daList["0"]);
                resolve();
            });
            promise.then(()=>{
                console.log("done");
            })
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
    useEffect(() => {
        //getting data from firestone for the first time
       fetchCardsData();
    }, []);
    return (
        <div id="check_out">
            <div className="left-container">
                <ShippingInfo></ShippingInfo>
                {card && cards && <Payment  addCardToDb={addCardToDb} setMyCard={setMyCard} card={card} cards={cards} getDis={getDis} getDebitDis={getDebitDis}></Payment>}
                <ItemsSummary list={props.list}></ItemsSummary>
            </div>
            <div className="right-container">
                <PriceTotal dis={dis} debit={debitDis}  list={props.list}></PriceTotal>
            </div>
            
        </div>
    );
}

export default CheckOut;
