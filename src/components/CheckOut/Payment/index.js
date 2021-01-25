import React, {useState, useEffect} from 'react';
import CARDS from '../../../model/Cards';
import GIFTCARDS from '../../../model/GiftCards';
import './payment.scss';
const Payment = (props) => {
    const [dacard, setdaCard] = useState(CARDS[0]);
    const [dagiftCard, setdaGiftCard] = useState(GIFTCARDS[0]);

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
        if(dagiftCard.id === "" || dagiftCard === undefined){
            props.getDis(0);
            props.getDebitDis(0);
        } else if (dagiftCard.type === "discount") {
            props.getDis(dagiftCard.dis);
            props.getDebitDis(0);
        } else if (dagiftCard.type === "debit") {
            props.getDebitDis(dagiftCard.ammount);
            props.getDis(0);
        }
        
    }

    let handleChangeGcard = (id) =>{
        if (id === ""){
           setdaGiftCard({id: ""}); 
        } else {
            setdaGiftCard(GIFTCARDS[id]);
        }
    }

    let handleChangeCard = (id) => {
        setdaCard(CARDS[id])
    }

    useEffect(() => {
        var giftCard = GIFTCARDS[0];//INITLA GIFT CARD
        if (giftCard.type === "debit"){
            props.getDebitDis(giftCard.ammount);
            props.getDis(0);
        } else if (giftCard.type === "dis"){
            props.getDis(giftCard.dis);
            props.getDebitDis(0);
        }
        
    }, []);
    return (
        <div id="payment">
                <h4 className="check-out-title">Payment</h4>
                <div className="card-options">
                    <div id="chosen-card">
                             <button  className="change-card" onClick={handleChange}>Change</button>
                             <div className="card-payment">
                                <img className="card-img" src={require("../../../images/Cards/" + dacard.imgSrc)}></img>
                                <span className="card-name"><b>{dacard.type}</b></span>
                                <span className="card-ending">Ending in {dacard.number.slice(15)}</span>
                             </div>
                             {(dagiftCard.id !== "" && dagiftCard != undefined) ? 
                             <div className="giftcard-payment">
                                <img className="gcard-img" src={require("../../../images/Cards/" + dagiftCard.imgSrc)}></img>
                                <span className="gcard-name">{
                                (dagiftCard.type === "debit"? ("$ " + dagiftCard.ammount) : (dagiftCard.dis + " %")) 
                                + " " + dagiftCard.name + " gift card"
                                }</span>
                             </div> : <div>No gift card chosen</div>}
                    </div>
                   <div id="change-card-field" className="display-none">
                        <div className="card-container-change">
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
                                    {CARDS.length > 0 && CARDS.map((card)=>{
                                        return(
                                            <tr key={card.id}>
                                                <td className="radio-value"><input onChange={()=>{handleChangeCard(card.id)}} defaultChecked={card.id == dacard.id } type="radio" name="card" value={card.id}></input></td>
                                                <td className="card-name"><b>{card.name} {" " + card.type}</b> ending in {card.number.slice(15)}</td>
                                                <td className="card-owner">{card.nameOnCard}</td>
                                                <td className="card-exp">{card.expM}/{card.expY}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {GIFTCARDS.length > 0 ? 
                        <div className="gcard-container-change">
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
                                                <td className="radio-value"><input onChange={()=>{handleChangeGcard(card.id)}} defaultChecked={card.id == dagiftCard.id } type="radio" name="giftCard" value={card.id}></input></td>
                                                <td className="card-name">{card.name}  </td>
                                                <td className="card-dis">{card.type == "debit" ? "$ " + card.ammount : card.dis + " %"}</td>
                                                <td className="card-owner">{card.nameOnCard}</td>
                                            </tr>
                                        );
                                        })}
                                    <tr>
                                        <td className="radio-value"><input onChange={()=>{handleChangeGcard("")}} defaultChecked={dagiftCard.id === ""} type="radio" name="giftCard" value={""}></input></td>
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
