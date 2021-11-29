import React from 'react';
import {Link} from 'react-router-dom';
import './flex-link.scss';
const FlexLink = (props) => {

    return (
        <Link className="flex-link" to={"/"+props.route} key={props.title}>

            <div className="flex-link-title">{props.extra? props.extra : ""}{props.title}</div>
            {props.description && <div className="flex-link-des">
                {props.description}
            </div>}
        </Link>
    );
}

export default FlexLink;
