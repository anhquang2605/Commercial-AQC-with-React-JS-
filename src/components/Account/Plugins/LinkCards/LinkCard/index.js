import React from 'react';
import {Link} from 'react-router-dom';
const LinkCard = (props) => {
    return (
        <div className="link-card">
            <Link to={props.path}>
                {props.name}
            </Link>
        </div>
    );
}

export default LinkCard;
