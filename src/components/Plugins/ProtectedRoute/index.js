import React from 'react';
import {Navigate, Route} from 'react-router-dom';
class ProtectedRoute extends React.Component {
    render() {
      const { component: Component, ...props } = this.props
      return (
        <Route path={props.path} exact= {this.props.exact}
          element={
            this.props.user && this.props.account ? this.props.element :
              <Navigate to='/sign-in' />
          } 
        />
      )
    }
  }

  export default ProtectedRoute;
