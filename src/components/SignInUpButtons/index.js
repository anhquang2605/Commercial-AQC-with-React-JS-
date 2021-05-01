import React from 'react';
import {Link} from 'react-router-dom';
import './sign-in-up-buttons.scss';
import * as ROUTES from './../../Constants/Routes';
const SignInUpButtons= (props) => {
    return (
        <div className='sign_in_up_buttons'>
            {props.user === "" ? <div><Link to={ROUTES.SIGN_IN}>Sign In</Link>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link></div> : <Link onClick={props.removeAccount} to="">Sign out</Link>}
            
        </div>
    );
}

export default SignInUpButtons;
