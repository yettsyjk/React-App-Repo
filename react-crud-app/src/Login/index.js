import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
        
    }
//handleSubmit function for form 
handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username);
}
handleChange = (e) => {
    this.setState({
        [e.currentTarget.name]: e.currentTarget.value
    });
}

render(){
    return (
        <div className="Modal">
            <h2 className="login_Container">Current weather and forecasts in your city</h2>
        <form onSubmit={this.handleSubmit}><span>Login with your free account 
            </span><br></br>
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} required autocomplete="off"/>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required autocomplete="off"/>
            <input type="submit" value="Sign In"/>
        </form>
        </div>
    )
}
}


export default Login;