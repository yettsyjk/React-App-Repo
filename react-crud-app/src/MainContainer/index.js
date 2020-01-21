import React, { Component } from 'react';

class MainContainer extends Component {
    render () {
        return(
        <div><h1>Welcome, {this.props.username}</h1></div>
        )
    }
}

export default MainContainer;