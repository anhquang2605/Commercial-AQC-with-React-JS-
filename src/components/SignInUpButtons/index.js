import React from 'react';
import {Link} from 'react-router-dom';
import './sign-in-up-buttons.scss';
import * as ROUTES from './../../Constants/Routes';
const SignInUpButtons= () => {
    return (
        <div className='sign_in_up_buttons'>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </div>
    );
}

export default SignInUpButtons;
