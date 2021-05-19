import React, {useState,useEffect, useRef} from 'react';
import CollapseTab from '../Plugins/CollapseTab';
import Modal from '../../Plugins/Modal';
import Firebase from '../../Firebase';
import './cards.scss';
const Cards = (props) => {
    //List of random state to generate when add a new card, as if the information is retrieved from the bank the card from
    const randomCities = ["San jose", "San Frans", "Sunny vale"];
    const randomStates = ["CA", "AZ", "NY"];
    const randomZips = ["97888","99999","11100"];
    const randomTypes = ["visa","master"];
    const INITIALCARDFORM = {//empty object used to initialize form for adding card
        name: "Newly added",
        owner: "",
        "card number": "",
        "exp month": 0,
        "exp year": 0,
        "billing address": "Newly added" + (Math.round(Math.random()*99)),
        "billing city": randomCities[Math.floor(Math.random()*3)],
        "billing state": randomStates[Math.floor(Math.random()*3)],
        "billing zip": randomZips[Math.floor(Math.random()*3)],
        type: randomTypes[Math.floor(Math.random()*2)],
        id: 0,
    }
    const [prepList, setPrepList] = useState([]);
    const [addingCardFromForm, setAddingCardFromForm] = useState({...INITIALCARDFORM});
    const [deletingCard, setDeletingCard] = useState({});
    const [confirmedAddedCard, setConfirmedAddedCard] = useState({});
    const [beforeEditedCard, setBeforeEditedCard] = useState({});//To remove in the fire store
    const [beingEdittedCard, setBeingEdittedCard] = useState({});//To add to the fire store to replace the removed one
    //reference to the modal that is exposed with there showModal and hideModal methods.
    const refForAddCardModal = useRef({});
    const refForRemoveCardModal = useRef({});
    const refForEditCardModal = useRef({});
    //Firebase 's firestore 
    const db = Firebase.firestore();
    
    let handlePreProcessingCardListToComponent = () => {//Transform the provided cards list from props to title and content props that is later used by collapse tab component
        if(props.list){
        return props.list.map((item,index)=>{
            return {
                title: //Title part
                <React.Fragment>
                    <span className="card-thumb"><img alt={item.type} src={require("./../../../images/Cards/" + item.type + ".jpg")}></img></span>
                    <span className="card-mini-info">{item.type} {item.name} {item["card number"]}</span>
                    <span>{item["exp month"]} / {item["exp year"]}</span>
                </React.Fragment>,
                content: //Content part
                <React.Fragment>
                    <div>
                        <h5>Name on card</h5>
                        <span>{item.owner}</span>
                    </div>
                    <div>
                        <h5>Billing Address</h5>
                        <div>
                            <span>{item["billing address"]}</span>
                            <span>{item["billing city"]}</span>
                            <span>{item["billing state"]}</span>
                            <span>{item["billing zip"]}</span>
                        </div>
                    </div>
                    <div className="card-edit-remove">
                        <button onClick={(e)=>{
                            e.stopPropagation();
                            handleClickEditCardButton(item,index)}} >Edit</button>
                        <button onClick={()=>{handleClickDeleteCardButton(item)}}>Delete</button>
                    </div>
                </React.Fragment>
            }
            })
        }
    }
    //Adding card to account
    let handleClickingAddCard = () => {
        refForAddCardModal.current.showModal();
    }
    let handleAddCardToAccount = () =>{ 
        let daCard = {...addingCardFromForm};
        daCard.id = props.list.length;
        let promise = new Promise((resolve,reject)=>{
            setConfirmedAddedCard(daCard);//Set the card to buffer before updating
            resolve("added confirmation");
        })
        promise.then((result)=>{//reset the buffer, close the modal
            if (result === "added confirmation"){
                setAddingCardFromForm({...INITIALCARDFORM});
                refForAddCardModal.current.hideModal();
                //!important to re update the account so that the cards list will be upto date
                props.reFetch();
            } else {
                console.log("cannot add");
            }
        });
    }
        //Handling adding field to card in form modal
    let handleAddingOwnerToCardForm = (e) => {
        setAddingCardFromForm((prevState)=>({
            ...prevState,
            owner: e.target.value,
        }))
    }
    let handleAddingCardNumberToCardForm = (e) => {
        setAddingCardFromForm((prevState)=>({
            ...prevState,
            "card number": e.target.value,
        }))
    }
    let handleAddingExpMonthToCardForm = (e) => {
        setAddingCardFromForm((prevState)=>({
            ...prevState,
            "exp month": e.target.value,
        }))
    }
    let handleAddingExpYearToCardForm = (e) => {
        setAddingCardFromForm((prevState)=>({
            ...prevState,
            "exp year": e.target.value,
        }))
    }
    //Handling deleting card
    let handleClickDeleteCardButton = (card) => {
        setDeletingCard(card);
        refForRemoveCardModal.current.showModal();
    } 
     let handleDeleteCard = () => {
        let daCard = {...deletingCard};
        let promise = new Promise((resolve,reject)=>{
            let accountDoc = db.collection("accounts").doc(props.accountID);
            accountDoc.update({
                cards: Firebase.firestore.FieldValue.arrayRemove(daCard)
            });
            resolve(); 
        });
        promise.then(()=>{     
            refForRemoveCardModal.current.hideModal();
        });
    }
    //Handling Editing 
    let handleClickEditCardButton = (card,index) => {
        setBeingEdittedCard(card);
        setBeforeEditedCard(card);
        refForEditCardModal.current.showModal();
    }
        //Handling editing form
    let handleOwnerChangeEditing = (e) =>{
        setBeingEdittedCard((prevState)=>({
            ...prevState,
            owner: e.target.value
        }));
    }
    let handleExpMonthChangeEditing = (e) =>{
        setBeingEdittedCard((prevState)=>({
            ...prevState,
            "exp month": e.target.value
        }))
    }
    let handleExpYearChangeEditing = (e) => {
        setBeingEdittedCard((prevState) => ({
            ...prevState,
            "exp year": e.target.value
        }))
    }
        //When user pressed confirmed
    let handleEditConfirmation = () =>{
        let daCard = {...beingEdittedCard};//To be added
        let daOrignial = {...beforeEditedCard};//To be removed, the original
        if (JSON.stringify(daCard) !== JSON.stringify(daOrignial)){//If there is difference
           let promise = new Promise((resolve,reject)=>{//First remove the original
                let accountDoc = db.collection("accounts").doc(props.accountID);
                accountDoc.update({
                    cards: Firebase.firestore.FieldValue.arrayRemove(daOrignial)
                });
                resolve(); 
            });
            promise.then(()=>{//Then add the updated version to replace the removed one     
                let accountDoc = db.collection("accounts").doc(props.accountID);
                accountDoc.update({
                    cards: Firebase.firestore.FieldValue.arrayUnion(daCard)
                });
                refForEditCardModal.current.hideModal();
            }); 
    /*         let accountDoc = db.collection("accounts").doc(props.accountID);
                accountDoc.get().then((snapShot)=>{
                let daCardsOld = snapShot.data().cards;
                let daCardsNew = snapShot.data().cards;
                daCardsNew[currentIndexOfEdited] = daCard;
                for (var i = 0; i < daCardsNew.length; i+=1){
                    accountDoc.update({
                        cards: Firebase.firestore.FieldValue.arrayUnion(daCardsNew[i])
                    });
                }
                for (var i = 0; i < daCardsOld.length; i+=1){
                    accountDoc.update({
                        cards: Firebase.firestore.FieldValue.arrayRemove(daCardsOld[i])
                    });
                }

            }).then(()=>{
                refForEditCardModal.current.hideModal();
            }); */
        }else{//no difference, simply close the box
            refForEditCardModal.current.hideModal();
        }
    }

 
    useEffect(() => {//preping item and markup to provide the collapse Tab
        setPrepList(handlePreProcessingCardListToComponent());
    }, []);
    useEffect(() => {//When confirmedAddedCard is update through the card adding method
        if(JSON.stringify(confirmedAddedCard)!== JSON.stringify({})){
            let accountDoc = db.collection("accounts").doc(props.accountID);
            accountDoc.update({
                cards: Firebase.firestore.FieldValue.arrayUnion(confirmedAddedCard)
            });
        }
    }, [confirmedAddedCard]);
    useEffect(()=>{//rerender Cards component whenever new card is added
        setPrepList(handlePreProcessingCardListToComponent());
    },[props.list])
    return (
        <div className="user-cards-manament">
            <h4>Payments</h4>
            <div className="title-for-card-list">
                <span className="card-name tab-head">Your Cards</span>
                <span className="card-exp tab-head">Expires</span>
            </div>
            {prepList && <CollapseTab list={prepList}>
            </CollapseTab>}
            <Modal hasTitle={true} ref={refForAddCardModal} name="add-card-for-account">
                    <div className="form-in-modal">
                        <span className="form-row-control">
                            <legend>Name on Card</legend>
                            <input type="text" onChange={handleAddingOwnerToCardForm} value={addingCardFromForm.owner} placeholder="Enter Name on Card"></input>
                        </span>
                        <span className="form-row-control">
                            <legend>Card Number </legend>
                            <input type="text" onChange={handleAddingCardNumberToCardForm} value={addingCardFromForm["card number"]} placeholder="Enter Card Number"></input>
                        </span>
                        <span className="form-row-control half exp-date">
                            <legend>Expire month/year (MM/YYYY)</legend>
                            <input className="exp-month" onChange={handleAddingExpMonthToCardForm} type="number" value={addingCardFromForm["exp month"]} min="1" max="12"></input>
                            <input className="exp-year" onChange={handleAddingExpYearToCardForm} type="number" value={addingCardFromForm["exp year"]} min="2020"></input>
                        </span>
                        <div className="add-card-btn half" onClick={handleAddCardToAccount}>Add Card</div>
                    </div>
            </Modal>
            <Modal ref={refForRemoveCardModal} name="remove-card-confirm">
                {deletingCard !== {} && <div>Are you sure you want to remove <b>{deletingCard.type}</b> card ending in {deletingCard["card number"]} ?</div>}
                <button onClick={handleDeleteCard}>Confirm</button> 
                <button onClick={refForRemoveCardModal.current.hideModal}>Cancel</button> 
            </Modal>
            <Modal hasTitle={true} ref={refForEditCardModal} name="edit-card-for-account">
            {beingEdittedCard!==undefined && <div className="form-in-modal">
                        <span className="form-row-control">
                            Card type, ending in {beingEdittedCard["card number"] === undefined ? "" : beingEdittedCard["card number"]}
                        </span>
                        <span className="form-row-control">
                            <legend>Name on Card</legend>
                            <input type="text" onChange={handleOwnerChangeEditing} value={beingEdittedCard.owner} placeholder="Enter Name on Card"></input>
                        </span>
                        <span className="form-row-control half exp-date">
                            <legend>Expire month/year (MM/YYYY)</legend>
                            <input className="exp-month" onChange={handleExpMonthChangeEditing} type="number" value={beingEdittedCard["exp month"]} min="1" max="12"></input>
                            <input className="exp-year" onChange={handleExpYearChangeEditing} type="number" value={beingEdittedCard["exp year"]} min="2020"></input>
                        </span>
                        <div className="add-card-btn half" onClick={handleEditConfirmation}>Confirm edit</div>
                    </div>}
            </Modal>
            <button onClick={handleClickingAddCard}>Add a new card</button>
        </div>
    );
}

export default Cards;
