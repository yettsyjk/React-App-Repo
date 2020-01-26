import React, { Component } from 'react';
import { Form, Button, Header, Modal } from 'semantic-ui-react';


class CreateBird extends Component {
    constructor() {
        super();
        //We're storing the form from the data in this.state
        this.state = {
            name: '',
            owner: '',
            breed: ''
        }
    }
//We have a handleChange method that populates this.state as the user keys in data in the form
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    clearForm = () => {
        this.setState({
            name: '',
            owner: '',
            breed: ''
        })
    }
    render() {
        return(
            <Modal open={this.props.open} closeIcon onClose={this.props.closeModal}>
                <Header>Add Bird</Header>
                    <Modal.Content>
                        <Form
                        size="large"
                        onSubmit={(e) => this.props.addBird(e, this.state)}
                        >
                            <Form.Field>
                                <label>Bird Name</label>
                                <Form.Input
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    />
                        </Form.Field>
                        <Form.Field>
                                <label>Bird Breed</label>
                                <Form.Input
                                    type="text"
                                    name="breed"
                                    value={this.state.breed}
                                    onChange={this.handleChange}
                                    />
                        </Form.Field>
                        <Button type="submit">Add New Bird To Lost</Button>
                        </Form>
                    </Modal.Content>
            </Modal>
        )
    }
}

export default CreateBird;