import React, { Component } from 'react';
import { Form, Button, Header, Modal } from 'semantic-ui-react';


class CreateCloud extends Component {
    constructor() {
        super();
        this.state = {
            city: '',
            us_state: '',
            country: '',
            weather: '',
            temp: '',
        }
}
handleChange = (e) => {
    this.setState({
        [e.currentTarget.name]: e.currentTarget.value
    })
}
clearForm = () => {
    this.setState({
        city: '',
            us_state: '',
            country: '',
            weather: '',
            temp: '',
    })
}
render() {
    return(
        <Modal open={this.props.open} closeIcon onClose={this.props.closeModal}>
            <Header>Add Local Weather</Header>
                <Modal.Content>
                    <Form
                    size="large"
                    onSubmit={(e) => this.props.addCloud(e, this.state)}
                    >
                        <Form.Field>
                            <label>City</label>
                            <Form.Input
                                type="text"
                                name="city"
                                value={this.state.city}
                                onChange={this.handleChange}
                                />
                    </Form.Field>
                    <Form.Field>
                            <label>State</label>
                            <Form.Input
                                type="text"
                                name="us_state"
                                value={this.state.us_state}
                                onChange={this.handleChange}
                                />
                    </Form.Field>
                    <Form.Field>
                            <label>Weather</label>
                            <Form.Input
                                type="text"
                                name="weather"
                                value={this.state.weather}
                                onChange={this.handleChange}
                                />
                    </Form.Field>
                    <Form.Field>
                            <label>Temperature</label>
                            <Form.Input
                                type="text"
                                name="temp"
                                value={this.state.temp}
                                onChange={this.handleChange}
                                />
                    </Form.Field>
                    <Button type="submit">Add New Weather Data</Button>
                    </Form>
                </Modal.Content>
        </Modal>
        )
    }
}
export default CreateCloud;