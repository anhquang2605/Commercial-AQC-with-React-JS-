import React, {useState, useEffect} from 'react';
import LinkCard from './LinkCard';
import './link-cards.scss';
const LinkCards = (props) => {
    useEffect(() => {
    }, []);
    return (
        <div className="link-cards-list">
            {props.list && props.list.map((item)=>{
                return(
                    <LinkCard key={item.name} path={item.path} name={item.name}>
                    </LinkCard>
                )
            })}
        </div>
    );
}

export default LinkCards;
