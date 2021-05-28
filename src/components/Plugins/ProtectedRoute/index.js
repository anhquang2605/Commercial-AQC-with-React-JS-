import React from 'react';
import {Redirect, Route} from 'react-router-dom';
class ProtectedRoute extends React.Component {
    render() {
      const { component: Component, ...props } = this.props
  
      return (
        <Route exact= {this.props.exact}
          {...props} 
          render={ () => (
            this.props.account ? this.props.component :
              <Redirect to='/sign-in' />
          )} 
        />
      )
    }
  }

  export default ProtectedRoute;
