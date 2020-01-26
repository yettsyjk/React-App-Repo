import React from 'react'
import { Form, Button, Header, Modal } from 'semantic-ui-react'

function EditBirdModal(props) {
    return (
        <Modal open={props.open} closeIcon onClose={props.closeModal}>
            <Header>Edit Bird</Header>
            <Modal.Content>
                <Form
                    size='large'
                    onSubmit={props.updateBird}
                >
                    <Form.Field>
                    <label>Bird Name</label>
                    <Form.Input
                    type="text"
                    name="name"
                    value={props.birdToEdit.name}
                    onChange={props.handleEditChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Bird Breed</label>
                    <Form.Input
                    type="text"
                    name="breed"
                    value={props.birdToEdit.breed}
                    onChange={props.handleEditChange}
                    />
                    </Form.Field>
                    <Form.Field>
                    <label>Bird Owner</label>
                    <Form.Input
                    type="text"
                    name="owner"
                    value={props.birdToEdit.owner}
                    onChange={props.handleEditChange}
                    />
                    </Form.Field>
                    <Button type="submit">Add Bird</Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
export default EditBirdModal