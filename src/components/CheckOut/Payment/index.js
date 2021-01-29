import React, {useState, useEffect} from 'react';
import GIFTCARDS from '../../../model/GiftCards';
import './payment.scss';
const Payment = (props) => {
    const [dacard, setdaCard] = useState(props.card);
    const [cards, setCards] =  useState(props.cards);
    const [dagiftCards, setdaGiftCard] = useState([]);
    let handleChange = (e) =>{
        e.stopPropagation();
        var changeField = document.getElementById("change-card-field");
        var chosen = document.getElementById("chosen-card");
        changeField.classList.remove("display-none");
        chosen.classList.add("display-none");
    }
    let handleClose = (e) =>{
        e.stopPropagation();
        var changeField = document.getElementById("change-card-field");
        var chosen = document.getElementById("chosen-card");
        chosen.classList.remove("display-none");
        changeField.classList.add("display-none"); 
        //Check if there is gift card or not, if there is, check if it is a debit or percentage
        //Should change this since it seems imparative
        if(dagiftCards.length === 0 || dagiftCards === undefined){
            props.getDis(0);
            props.getDebitDis(0);
        } else {
            handleDiscount();
        } 

        
    }
    let handleDiscount = () => {
        var disObj = {dis: 0, ammt: 0};
        dagiftCards.forEach(card => {
            if(card.type==="discount"){
                disObj.dis +=  card.dis;
            } else {
                disObj.ammt += card.ammount;
            }
        });
        props.getDis(disObj.dis);
        props.getDebitDis(disObj.ammt);
    }
    let handleChangeGcard = (id,e) =>{
        var items = [...dagiftCards];    
        var newList;
        if(e.target.checked){//if checked the box, added the item
            items.push(GIFTCARDS[id]);
            setdaGiftCard(items);
        } else {// else unchecked, remove the item
            var found = items.findIndex(ele => ele.id === id);
            newList = items.slice(0, found).concat(items.slice(found + 1, items.length))
            setdaGiftCard(newList);
        }       
    }
    let noGiftCard = (e) => {
        var dontUseThem = e.target.checked;
        if(dontUseThem){
            setdaGiftCard([]);
            
        }
        
    }
    let handleChangeCard = (id) => {
        props.setMyCard(id);
    }
    useState(()=>{
        if(props.cards){
            setdaCard(props.card);
            setCards(props.cards);
        }
    },[]);
    return (
        <div id="payment">
                <h4 className="check-out-title">Payment</h4>
                <div className="card-options">
                    <div id="chosen-card">
                             <button  className="change-card" onClick={handleChange}>Change</button>
                             {props.card && <div className="card-payment">
                                 <img className="card-img" src={require("../../../images/Cards/" + props.card.imgSrc)}></img>
                                <span className="card-name"><b>{props.card.type} </b></span>
                                <span className="card-ending">Ending in {props.card["card number"].slice(12)}</span> 
                             </div>}
                             {(dagiftCards.length !== 0) ? 
                             <div className="giftcard-payment">
                                {dagiftCards.map(card => {
                                return(
                                <div key={card.id} className="chosen-gift-card">
                                    <img className="gcard-img" src={require("../../../images/Cards/" + card.imgSrc)}></img>
                                    <span className="gcard-name">{
                                    (card.type === "debit"? ("$ " + card.ammount) : (card.dis + " %")) 
                                    + " " + card.name + " gift card"}</span>
                                </div>
                                );
                                
                            })}
                             </div> : <div>No gift card chosen, you owned <b>{GIFTCARDS.length}</b> gift cards </div>}
                    </div>
                   <div id="change-card-field" className="display-none">
                        <div className="card-container-change">
                            <h4>Cards for payment</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Card Name</th>
                                        <th>Name of Card</th> 
                                        <th>Expires on</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.cards  && props.cards.map((card)=>{
                                        return( 
                    
                                           <tr key={card["id"]}>

                                               { <td className="radio-value"><input onChange={()=>{handleChangeCard(card["id"])}} defaultChecked={card["id"] == props.card["id"] } type="radio" name="card" value={card["id"]}></input></td>}
                                                <td className="card-name"><b>{card.name} {" " + card.type}</b> ending in {card["card number"].slice(12)}</td>
                                                <td className="card-owner">{card.owner.toUpperCase()}</td>
                                                <td className="card-exp">{card["exp month"]}/{card["exp year"]}</td>
                                            </tr>  
                                        );
                                    })}
                                </tbody>
                            </table>
                            <button className="btn add-card-btn">+ Add a new card</button>
                        </div>
                        {GIFTCARDS.length > 0 ? 
                        <div className="gcard-container-change">
                            <h4>Gift cards</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Card Name</th>
                                        <th>Ammount / %</th>
                                        <th>Name of Card</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {GIFTCARDS.map((card)=>{
                                        return(
                                            <tr key={card.id}>
                                                <td className="checkbox-value"><input onChange={(e)=>{handleChangeGcard(card.id,e)}} checked={dagiftCards.findIndex(dacard => dacard.id === card.id) != -1}   type="checkbox" name={"giftcard" + (parseInt(card.id) + 1)} value={card.id}></input></td>
                                                <td className="card-name">{card.name}  </td>
                                                <td className="card-dis">{card.type == "debit" ? "$ " + card.ammount : card.dis + " %"}</td>
                                                <td className="card-owner">{card.nameOnCard}</td>
                                            </tr>
                                        );
                                        })}
                                    <tr>
                                        <td className="checkbox-value"><input onChange={(e)=>{
                                            noGiftCard(e)}} checked={dagiftCards.length===0}  type="checkbox" name="giftCard"></input></td>
                                        <td className="card-name">I don't use any gift card</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                        : <div className="no-gift-card">No gift card available</div>}
                        <button className="commit-btn" onClick={handleClose}>Commit change (Close)</button>
                        </div>
                </div>                
        </div>
    );
}

export default Payment;
