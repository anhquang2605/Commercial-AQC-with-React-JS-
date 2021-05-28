import React from 'react';
import {Link} from 'react-router-dom';
import './flex-link.scss';
const FlexLink = (props) => {

    return (
        <Link className="flex-link" to={"/"+props.route} key={props.title}>
            {props.extra? props.extra : ""}
            {props.title}
        </Link>
    );
}

export default FlexLink;
