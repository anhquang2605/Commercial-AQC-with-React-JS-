import React, {useState,useEffect} from 'react';
import CollapseTab from '../Plugins/CollapseTab';
import './cards.scss';
const Cards = (props) => {
    const [prepList, setPrepList] = useState([])
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
                </React.Fragment>
            }
        }));
    }, []);
    return (
        <div className="user-cards-manament">
            <h4>Payments</h4>
            {prepList && <CollapseTab list={prepList}>
            </CollapseTab>}
        </div>
    );
}

export default Cards;
