import React, { Component } from 'react';
import '../App.css';
import { Form, Button, Grid, Message, Segment } from 'semantic-ui-react';

class LoginRegisterForm extends Component {
    
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            username: '',
            action: 'login'
        }
    }
    login = async (loginInfo) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(loginInfo),
            headers: {
                'Content-Type': 'application/json'
         }
        })
        const parsedLoginResponse = await response.json()
        if(parsedLoginResponse.status.code === 200){
            this.props.loggedStatus(parsedLoginResponse.data.email)
            this.props.history.push('/clouds');
        } else {
            console.log('Login Failed: ', parsedLoginResponse);
            }
        }
register = async (registerInfo) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/register`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(registerInfo),
            headers: {
                'Content-Type': 'application/json'
            }
    })
    const parsedRegisterResponse = await response.json();
    if(parsedRegisterResponse.status.code === 201){
        this.props.loggedStatus(parsedRegisterResponse.data.email)
        this.props.history.push('/clouds');
    } else {
        console.log('Register Failed: ', parsedRegisterResponse);
    }
}
 handleChange =(e) => {
    this.setState({
        [e.currentTarget.name]: e.currenttarget.value
        })
    }
//handleSubmit function for form 
handleSubmit = (e) => {
    e.preventDefault();
    this.loginRegister()
}
addUsername = async (e) => {
    e.preventDefault()
    await this.setState({
        message: "Created inside Login Component"
    })
    this.props.test(this.state)
    this.setState({
        username: ""
    })
}
switchForm = () => {
    if(this.state.action === "login"){
        this.setState({
        action: "register"
    })
} else {
    this.setState({
        action: "login"
    })
 }
}
loginRegister = () => {
    if(this.state.action === "login"){
        this.login({
            email: this.state.email,
            password: this.state.password
        })
    } else {
        this.register({
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        })
    }
}
componentDidMount(){
    console.log('componentDidMount')
}

render(){
    return (
        <div className="LoginRegisterForm">
            { !this.props.loggedIn ?
           <Grid
           textAlign="center"
           style={{height: '200vh'}}
           verticalAlign="middle"
           >
               <Grid.Column style={{ maxWidth: 450 }}>
                   <Form size="large" onSubmit={this.handleSubmit}>
                       <Segment stacked>
                           { this.state.action === "register" ?
                           <React.Fragment>
                               <Form.Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                               />
                               </React.Fragment>
                               :
                               null
                            }
                               <Form.Input
                                    fluid
                                    icon="mail"
                                    iconPosition="left"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                               />
                               <Form.Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                               />
                               <Button fluid size="large" type="Submit">
                                   {this.state.action === "register" ? "Register" : "Log in"}
                               </Button>
                           </Segment>
                        </Form>
    <Message>
        {
            this.state.action === "register" ?
            <small>Already have an account? Log In <span onClick={this.switchForm}>here</span>.</small>
            :
            <small>Sign Up for Free Account<span onClick={this.switchForm}>here</span>.</small>
        }
    </Message>
               </Grid.Column>
           </Grid>:<div></div>}
           
        </div>
        )
    }
}



export default LoginRegisterForm;