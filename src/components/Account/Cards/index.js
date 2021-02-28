import React, {useState,useEffect, useRef} from 'react';
import CollapseTab from '../Plugins/CollapseTab';
import Modal from '../../Plugins/Modal';
import './cards.scss';
const Cards = (props) => {
    const [prepList, setPrepList] = useState([])
    const refForAddCardModal = useRef({});
    const refForRemoveCardModal = useRef({});
    const refForEditCardModal = useRef({});
    useEffect(() => {//preping item and markup to provide the collapse Tab
        setPrepList(props.list.map((item)=>{
            return {
                title: 
                <React.Fragment>
                    <span className="card-thumb"><img src={require("./../../../images/Cards/" + item.type + ".jpg")}></img></span>
                    <span className="card-mini-info">{item.type} {item.name} {item["card number"]}</span>
                    <span>{item["exp month"]} / {item["exp year"]}</span>
                </React.Fragment>,
                content: 
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
                        <button onClick={refForEditCardModal.current.showModal} >Edit</button>
                        <button onClick={refForRemoveCardModal.current.showModal}>Delete</button>
                    </div>
                </React.Fragment>
            }
        }));
    }, []);
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
                            <input type="text" value="" placeholder="Enter Name on Card"></input>
                        </span>
                        <span className="form-row-control">
                            <legend>Card Number </legend>
                            <input type="text" value="" placeholder="Enter Card Number"></input>
                        </span>
                        <span className="form-row-control half exp-date">
                            <legend>Expire month/year (MM/YYYY)</legend>
                            <input className="exp-month" type="number" value="" min="1" max="12"></input>
                            <input className="exp-year" type="number" value="" min="2020"></input>
                        </span>
                        <div className="add-card-btn half">Add Card</div>
                    </div>
            </Modal>
            <Modal ref={refForRemoveCardModal} name="remove-card-confirm">
                <div>Are you sure you want to remove ?</div>
                <button>Confirm</button> 
                <button>Cancel</button> 
            </Modal>
            <Modal hasTitle={true} ref={refForEditCardModal} name="edit-card-for-account">
                    <div className="form-in-modal">
                        <span className="form-row-control">
                            Card type, ending in AAAA
                        </span>
                        <span className="form-row-control">
                            <legend>Name on Card</legend>
                            <input type="text" value="" placeholder="Enter Name on Card"></input>
                        </span>
                        <span className="form-row-control half exp-date">
                            <legend>Expire month/year (MM/YYYY)</legend>
                            <input className="exp-month" type="number" value="" min="1" max="12"></input>
                            <input className="exp-year" type="number" value="" min="2020"></input>
                        </span>
                        <div className="add-card-btn half">Confirm edit</div>
                    </div>
            </Modal>
            <button onClick={refForAddCardModal.current.showModal}>Add a new card</button>
        </div>
    );
}

export default Cards;
