import React, { Component} from 'react';

import './App.css';
import Login from './Login';
import MainContainer from './MainContainer';
// import CloudContainer from './CloudContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '', 
      logged: false
    }
  }
  login = (username) => {
    console.log(username);
    this.setState({
      username: username,
      logged: true
    })
  }
  render() {
  console.log(this.state)
  return (
    <div className="App">
      <header className="App-header">
        {this.state.logged ? <MainContainer username={this.state.username}/> : <Login login={this.login} />}
        {/* <CloudContainer /> */}
      </header>
    </div>
  );
}
}
export default App;
