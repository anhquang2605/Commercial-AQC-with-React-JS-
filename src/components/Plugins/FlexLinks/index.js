import React, {useState, useEffect} from 'react';
import FlexLink from './FlexLink';
import './flex-links.scss';
const FlexLinks = (props) => {
    let prepareItems = () => {
        let daList = props.list.map((item)=>
        (<FlexLink   title = {item.title}
            route = {item.route}
            description = {item.description}
            extra = {item.extra? item.extra: ""}>
        </FlexLink> 
        ));
        return daList;
    }
    return (
        <div className="flex-links flex-links-parent">
            {prepareItems()}
        </div>
    );
}

export default FlexLinks;
