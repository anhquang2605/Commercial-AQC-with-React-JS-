import React from 'react';
import Header from '../Header';
class App extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>Commercial website</h1>
                <Header/>
            </div>
        )
    }
} 

export default App;