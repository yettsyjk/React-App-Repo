import React, { Component } from 'react';
import LoginRegisterForm from './Login';
import BirdContainer from './BirdContainer';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';

const My404 = () => {
  return(
    <div>You are in the wrong location!</div>
  )
};

class App extends Component {
  constructor(){
    super();

    this.state = {
      loggedIn: false,
      loggedInUserEmail: null,
    }
  }

  handleLoggedInStatus = (loggedInUserEmail) => {
    this.setState({
      loggedIn: true,
      loggedInUserEmail: loggedInUserEmail
    })
  }

  logout = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
  })
  
  const parsedLogoutResponse = await response.json(); 

  if(parsedLogoutResponse.status.code === 200){
    this.setState({
      loggedIn: false,
      loggedInUserEmail: ''
    })
  } else {
    console.log('Register Failed: ', parsedLogoutResponse);
  }
}

  render(){
    return(
      <main className="App">
        <Header loggedIn={this.state.loggedIn} loggedInUserEmail={this.state.loggedInUserEmail} logout={this.logout}/>
        <h2>Bird App</h2>
        <Switch>
          <Route exact path="/" render={(props) => <LoginRegisterForm {...props} loggedIn={this.state.loggedIn} loggedStatus={this.handleLoggedInStatus} /> }/>
          <Route exact path="/birds" render={(props) => <BirdContainer {...props} loggedIn={this.state.loggedIn} loggedStatus={this.handleLoggedInStatus} /> } />
          <Route exact path="/login" />
          <Route component={ My404 }/>
        </Switch>
      </main>
    )
  }
};

export default App;
