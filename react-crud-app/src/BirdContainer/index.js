import React, { Component } from 'react';
import BirdList from '../BirdList';
import CreateBird from '../CreateBird';
import EditBirdModal from '../EditBirdModal';
import { Grid, Button } from 'semantic-ui-react';

class BirdContainer extends Component {
        state = {
            birds: [],
            createModalOpen: false,
            editModalOpen: false,
            birdToEdit: {
                name: '',
                owner: '',
                breed: '',
                id: ''
        }
    }

    createBird = () => {
        this.setState({
            createModalOpen: true
        })
    }
    
    addBird = async (e, birdFromTheForm) => {
        e.preventDefault()
        try{
            const createdBirdResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/birds/`, {
                method: "POST", 
                body : JSON.stringify(birdFromTheForm),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'include'
            }); 
            const parsedResponse = await createdBirdResponse.json();
       
            this.setState({
                birds: [...this.state.birds, parsedResponse.data]
            })

            this.closeCreateModal()
        } catch (err) {
            console.log("error: ", err)
        }
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        }, () => {
            this.createBirdFormRef.current.clearForm();
        })
    }  
    //Wait until the component is mounted to call the getBirds function
    componentDidMount() {
        this.getBirds();
    }  

    getBirds = async () => {
        try {
            const birds = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/birds/`, {credentials: 'include'})
            const parsedBirds = await birds.json();
            console.log('parsedBirds: ', parsedBirds)
        
            this.setState({
                birds: parsedBirds.data
            })
        } catch (err) {
        console.log(err);
        }
    }

    editBird = (idOfBirdToEdit) => {
        const birdToEdit = this.state.birds.find(bird => bird.id === idOfBirdToEdit)
        this.setState({
            editModalOpen: true,
            birdToEdit: {
                ...birdToEdit
            }
        })
    }

    handleEditChange = (event) => {
        this.setState({
            birdToEdit: {
                ...this.state.birdToEdit,
            [event.target.name]: event.target.value
            }
        })
    }

    updateBird = async (e) => {
        e.preventDefault()
        try{
            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/birds/${this.state.birdToEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.birdToEdit),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const updateResponseParsed = await updateResponse.json()

            const newBirdArrayWithUpdate = this.state.birds.map((bird) => {
                if(bird.id === updateResponseParsed.data.id) {
                    bird = updateResponseParsed.data
                }
                return bird
            })

            this.setState({
                birds: newBirdArrayWithUpdate
            })

            this.closeEditModal()

        }catch (err) {
            console.log(err)
        }
    }

    closeEditModal = () => {
        this.setState({
            editModalOpen: false
        })
    }

    deleteBird = async (id) => {
        const deleteBirdResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/birds/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        const deleteBirdParsed = await deleteBirdResponse.json();

        this.setState({
            birds: this.state.birds.filter((bird) => bird.id !== id)
        })
    }

    render(){
        const { loggedIn } = this.props
        return(
            <div className="Birds">
                { loggedIn 
                    ?
                <Grid
                    textAlign="center"
                    style={
                        { marginTop: '6em', height: '100%'}
                    }
                    verticalAlign="top"
                    stackable
                >
                    <Grid.Row>
                        <Button onClick={this.createBird}>Create New Bird</Button>
                        </Grid.Row>
                    <Grid.Row>
                    <Grid.Column>
                        <BirdList
                            birds={this.state.birds}
                            deleteBird={this.deleteBird}
                            editBird={this.editBird}
                        />
                    </Grid.Column>
                    <CreateBird
                    open={this.state.createModalOpen}
                    closeModal={this.closeCreateModal}
                    addBird={this.addBird}
                    ref={this.createBirdFormRef}
                    />
                    <EditBirdModal
                        open={this.state.editModalOpen}
                        updateBird={this.updateBird}
                        birdToEdit={this.state.birdToEdit}
                        closeModal={this.closeEditModal}
                        handleEditChange={this.handleEditChange}
                    />
                </Grid.Row>
                </Grid>
                :
                <Grid
                    textAlign='center'
                    style={{ marginTop: '6em', height: '100%' }}
                    verticalAlign='top'
                    stackable
                >
                    You must be logged in to see your bird lists.
                </Grid>
                }
            </div>
        )
        }
    }

export default BirdContainer