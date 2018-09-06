import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            implemented: false
        }
    }

    render() {
        return <div><h1>Not Implemented</h1></div>
    }
};

ReactDOM.render(<App />, document.getElementById("root"))