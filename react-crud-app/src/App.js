import React, { Component} from 'react';
// import LoginRegisterForm from './Login';
import './App.css';
import CloudContainer from './CloudContainer';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';

const My404 = () => {
  return(
    <div>You are in the wrong location!</div>
  )
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: true,
      username: "",
      loggedInUserEmail: null
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
  const headerStyle = {
    display: "flex",
    listStyle: "none",
    padding: "5em",
    justifyContent: "center",
    flexDirection: "row"
  }
  return(
    <main className="App">
      <Header style={headerStyle}/>
      <h2>Weather App</h2>
      <Switch>
        <Route exact path="/clouds" render={(props) => <CloudContainer {...props} loggedIn={this.state.loggedIn} loggedStatus={this.handleLoggedInStatus}/> } />
        <Route component = { My404 }/>
      </Switch>
    </main>
  );
}
}
export default App;
