import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./thank-you.scss";
class ThankYou extends Component {
    generateRanDomMaxChar = (max) =>{
        const maxChar = max;
        let charList=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];
        let charListLength = charList.length;
        let listOfTenChar = [];
        let i = 0;
        for (i; i<maxChar; i+=1){
            let randomNo = Math.floor(Math.random()*charListLength);
            listOfTenChar.push(charList[randomNo]);
        }
        return listOfTenChar.toString().replaceAll(',',"").toUpperCase();
    }
    render() {
        return (
            <div>
                Thank You 
                <div>
                    Here is your tracking number: 
                    <span className="tracking-number">{this.generateRanDomMaxChar(15)}</span>
                    <Link to="/">Continue Shopping</Link>
                </div>
            </div>
        );
    }
}

export default ThankYou;
