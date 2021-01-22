import React, {useState, useEffect} from 'react';
import CARDS from '../../../model/Cards';
import GIFTCARDS from '../../../model/GiftCards';
import './payment.scss';
const Payment = (props) => {
    return (
        <div id="payment">
                <h4 className="check-out-title">Payment</h4>
                <div className="card-options">
                    <button className="change-card">Change</button>
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
                                            <td className="radio-value"><input type="radio" name="card" value={card.id}></input></td>
                                            <td className="card-name"><b>{card.name} {" " + card.type}</b> ending in {card.number.slice(15)}</td>
                                            <td className="card-owner">{card.nameOnCard}</td>
                                            <td className="card-exp">{card.expM}/{card.expY}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="giftcard-options">
                    <button className="change-giftcard">Change</button>
                    <div className="card-container-change">
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
                                {GIFTCARDS.length > 0 && GIFTCARDS.map((card)=>{
                                    return(
                                        <tr key={card.id}>
                                            <td className="radio-value"><input type="radio" name="giftCard" value={card.id}></input></td>
                                            <td className="card-name">{card.name} {" " + card.type} </td>
                                            <td className="card-dis">{card.type == "debit" ? "$ " + card.ammount : card.dis + " %"}</td>
                                            <td className="card-owner">{card.nameOnCard}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                </div>
                </div>
                <button className="commit-btn">Com mit change</button>
        </div>
    );
}

export default Payment;
