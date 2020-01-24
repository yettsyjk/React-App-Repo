import React from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'

function EditCloudModal() {
    return (
        <Modal>
            <Header></Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                    <label>City Name</label>
                    <Form.Input
                    type="text"
                    name="city"
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>State</label>
                    <Form.Input
                    type="text"
                    name="state"
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Weather</label>
                    <Form.Input
                    type="text"
                    name="weather"
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Temperature</label>
                    <Form.Input
                    type="text"
                    name="temp"
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Feels Like</label>
                    <Form.Input
                    type="text"
                    name="image"
                    />
                    </Form.Field>
                    <Button type="submit">Add Cloud</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
export default EditCloudModal