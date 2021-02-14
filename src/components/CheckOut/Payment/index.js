import React, {useState, useEffect, useRef} from 'react';
import GIFTCARDS from '../../../model/GiftCards';
import Modal from '../../Plugins/Modal';
import './payment.scss';

const Payment = (props) => {
    const [dacard, setdaCard] = useState(props.card);
    const [addingCard, setAddingCard] = useState({
        owner: "",
        "card number": "",
        "exp month": 0,
        "exp year": 0,
        type: "",
        id: 0,
        name: "added from modal",
        imgSrc: "kirby.jpg"    
    });
    const [cards, setCards] =  useState(props.cards);
    const [dagiftCards, setdaGiftCard] = useState(props.gcards);
    //ref to modal
    const modalRef = useRef();
    //get current year for min year in card
    let dateobj = new Date();
    let fullYear = dateobj.getFullYear();

    //When user click change button to change their cards option
    let handleChange = (e) =>{
        e.stopPropagation();
        var changeField = document.getElementById("change-card-field");
        var chosen = document.getElementById("chosen-card");
        changeField.classList.remove("display-none");
        chosen.classList.add("display-none");
    }
    //when use click close button or commit to change to hide the change option tab
    let handleClose = (e) =>{
        e.stopPropagation();
        var changeField = document.getElementById("change-card-field");
        var chosen = document.getElementById("chosen-card");
        chosen.classList.remove("display-none");
        changeField.classList.add("display-none"); 
        handleDiscount();
    }
    //get discount information through the states arrays dagiftCards 
    //then call its parent method to get discount ammount and/or discount percentage
    let handleDiscount = () => {
        var disObj = {dis: 0, ammt: 0};
        //Check if there is gift card or not, if there is, check if it is a debit or percentage
        //Should change this since it seems imparative
        if(dagiftCards.length === 0 || dagiftCards === undefined){
            props.getDis(disObj.dis);
            props.getDebitDis(disObj.ammt);
            return;
        } else {
            dagiftCards.forEach(card => {
                if(card.type==="discount"){
                    disObj.dis +=  card.dis;
                } else {
                    disObj.ammt += card.ammount;
                }
            });
        }
        props.getDis(disObj.dis);
        props.getDebitDis(disObj.ammt);
    }
    //On select, add G card chosen to the state dagiftCards array
    let handleChangeGcard = (id,e) =>{
        var items = [...dagiftCards];    
        var newList;
        if(e.target.checked){//if checked the box, added the item
            items.push(GIFTCARDS[id]);
            setdaGiftCard(items);
            props.setGCardForApp(items);
        } else {// else unchecked, remove the item
            var found = items.findIndex(ele => ele.id === id);
            newList = items.slice(0, found).concat(items.slice(found + 1, items.length))
            setdaGiftCard(newList);
            props.setGCardForApp(newList);
        }       
    }
    //If unchecked the gift card option, remove the card from the dagiftCard state
    let noGiftCard = (e) => {
        var dontUseThem = e.target.checked;
        if(dontUseThem){
            setdaGiftCard([]);
            props.setGCardForApp([]);        
        }
        
    }
    let handleChangeCard = (id) => {
        props.setMyCard(id);
    }
    //Handle add card from modal
    let handleAddCard = () => {
        var thecard = {...addingCard};
        props.addCardToDb(thecard);
        modalRef.current.hideModal();
    }
    //Input state management
    let handleOwnerNameChange = (e) => {
        setAddingCard(prevState => ({
            ...prevState,
            owner: e.target.value
        }))
    }
    let handleCardNumberChange = (e) =>{
        setAddingCard(prevState => ({
            ...prevState,
            "card number": e.target.value
        }))
    }
    let handleTypeSelect = (e) => {
        setAddingCard(prevState => ({
            ...prevState,
            type: e.target.value
        }))
    }
    let handleMonthChange = (e) => {
        setAddingCard(prevState => ({
            ...prevState,
            "exp month": e.target.value
        }))
    }
    let handleYearChange = (e) => {
        setAddingCard(prevState => ({
            ...prevState,
            "exp year": e.target.value
        }))
    }
    //initiate, componentDidMount
    useState(()=>{
        if(props.cards){
            setdaCard(props.card);
            setCards(props.cards);
        }
        handleDiscount();
    },[]);

    return (
        <div id="payment">
                <h4 className="check-out-title">Payment</h4>
                {/*default option for cards and gift cards */}
                <div className="card-options">
                    <div id="chosen-card">       {/*chosen card*/}
                             <button  className="change-card" onClick={handleChange}>Change</button>
                             {props.card && <div className="card-payment">
                                 <img className="card-img" src={require("../../../images/Cards/" + props.card.imgSrc)}></img>
                                <span className="card-name"><b>{props.card.type} </b></span>
                                <span className="card-ending">Ending in {props.card["card number"].slice(12)}</span> 
                             </div>}
                             {(dagiftCards.length !== 0) ? 
                             <div className="giftcard-payment">{/*chosen gift card(s)*/}
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
                   <div id="change-card-field" className="display-none">{/*initially hidden, appear when click change button in #chosen-card*/}
                        <div className="card-container-change">{/*change field for card*/}
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
                            <button className="btn add-card-btn" onClick={()=>{modalRef.current.showModal()}}>+ Add a new card</button>
                        </div>
                        {GIFTCARDS.length > 0 ? 
                        <div className="gcard-container-change">{/*change field for  gift card*/}
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
                                        <td className="card-name">I don't use any gift card</td>{/*if user dont want to use any gift card*/}
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                        : <div className="no-gift-card">No gift card available</div>}
                        <button className="commit-btn" onClick={handleClose}>Commit change (Close)</button>
                        </div>
                </div>               
                <Modal name="add_card_form" ref={modalRef}>{/*hide initially, only show when evoke showModal method of the component Modal through ref*/}
                                <div className="add-card-form">
                                    <span className="form-row-control">
                                        <legend htmlFor="card owner">Full Name</legend><br></br>
                                        <input type="text" onChange={handleOwnerNameChange} value={addingCard.owner} placeholder=" Enter Name on Card" required></input>
                                    </span>
                                    <span className="form-row-control">
                                        <legend htmlFor="card number">Card Number</legend><br></br>
                                        <input type="text" onChange={handleCardNumberChange} value={addingCard["card number"]} placeholder="Enter Card Number" required></input>
                                    </span>
                                    <span className="form-row-control">
                                        <legend htmlFor="cvs">CVS</legend><br></br>
                                        <input type="text" placeholder="Enter CVS"></input>
                                    </span>
                                    <span className="form-row-control">
                                        <legend htmlFor="type">Type of cards</legend><br></br>
                                        <select required className="card-type" value={addingCard.type} onChange={handleTypeSelect} placeholder="Select card type">
                                            <option value="" disabled >Select card type</option>
                                            <option value="debit">Debit</option>
                                            <option value="credit">Credit</option>
                                            <option value="visa">Visa</option>
                                            <option value="master">Master</option>
                                        </select>
                                    </span>
                                    <span className="form-row-control exp-date">
                                        <legend htmlFor="exp">Expires on (month/YYYY)</legend>
                                        <input required type="number" value={addingCard["exp month"]} onChange={handleMonthChange} className="exp-month exp" max="12" min="1"></input>
                                        <input required type="number" value={addingCard["exp year"]} onChange={handleYearChange} className="exp-year exp" min={fullYear}></input>{/*full year got in the begining through date obj*/}
                                    </span>
                                </div>
                                <button onClick={handleAddCard}>Add card</button>
                    </Modal> 
        </div>
    );
}

export default Payment;
