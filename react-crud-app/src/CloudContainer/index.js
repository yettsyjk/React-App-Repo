import React, { Component } from 'react';
import CloudList from '../CloudList';
import CreateCloud from '../CreateCloud';
import EditCloudModal from '../EditCloudModal';
import { Grid, Button } from 'semantic-ui-react';

class CloudContainer extends Component {
    constructor() {
        super();
        this.createCloudFormRef = React.createRef()
        this.state = {
                clouds: [],
                // city: "",
                // us_state: "",
                // country: "",
                // weather: "",
                // temp: 0,
            createModalOpen: false,
            editModalOpen: false,
            // searchedDone: false,
            // savedCities: [],
            // hasSavedCities: false,
            // errorMessage: "",
            cloudToEdit: {
                city: "",
                us_state: "",
                country: "",
                weather: "",
                temp: "",
                id: ""
            }
        }
    }
       
editCloud = (idOfCloudToEdit) => {
    const cloudToEdit = this.state.clouds.find(cloud => cloud.id == idOfCloudToEdit)
    this.setState({
        editModalOpen: true,
        cloudToEdit: {
            ...cloudToEdit
        }
    })
}
handleEditChange = (e) => {
    this.setState({
        cloudToEdit: {
            ...this.state.cloudToEdit,
            [e.target.name]: e.target.value
        }
    })
}
updateCloud = async (e) => {
    e.preventDefault()
    try{
        const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/clouds/${this.state.cloudToEdit.id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state.cloudToEdit),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        const updateResponsedParsed = await updateResponse.json()
        const newCloudArrayWithUpdate = this.state.clouds.map((cloud) => {
            if(cloud.id === updateResponsedParsed.data.id){
                cloud = updateResponsedParsed.data
            }
            return cloud
        })
        this.setState({
            clouds: newCloudArrayWithUpdate
        })
        this.closeEditModal()
    }catch(err) {
        console.log(err)
    }
}
closeEditModal = () => {
    this.setState({
        editModalOpen: false
    })
}
deleteCloud = async (id) => {
    const deleteCloudResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/clouds/${id}`, {
        method: 'DELETE'
    })
    await deleteCloudResponse.json()
    this.setState({
        clouds: this.state.clouds.filter((cloud) => cloud.id !== id)
    })
}
 createCloud = () => {
     this.setState({
         createModalOpen: true
        })
    }
 addCloud = async (e, cloudFromTheForm) => {
        e.preventDefault()
        try{
            const createdCloudResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/clouds/`, {
                method: "POST", 
                body : JSON.stringify(cloudFromTheForm),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'include'
            }); 
            const parsedResponse = await createdCloudResponse.json()
            this.setState({
                clouds: [...this.state.clouds, parsedResponse.data]
            })
            this.closeCreateModal()
        } catch (err){
            console.log("error: ", err)
    }
    }
    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        }, () => {
            this.createCloudFormRef.current.clearForm()
        })
    }
    getClouds = async ()=>{
        try {
            const clouds = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/clouds/`, {credentials: 'include'})
            const parsedClouds = await clouds.json();
            console.log('parsedClouds: ', parsedClouds)
            
            this.setState({
                clouds: parsedClouds.data
            })
        } catch(err) {
            console.log(err)
        }
    }
    
    componentDidMount() {
        this.getClouds();
    }

render(){
    
    return(
        <div className="Clouds">
            {
                this.props.loggedIn ?
            <Grid
                textAlign="center"
                style={
                    { marginTop: '6em', height: '100%'}
                }
                verticalAlign="top"
                stackable
            >
                <Grid.Row>
                    <Button onClick={this.createCloud}>Create Weather request</Button>
                    </Grid.Row>
                <Grid.Row>
                <Grid.Column>
                    <CloudList
                        clouds={this.state.clouds}
                        deleteCloud={this.state.deleteCloud}
                        editCloud={this.state.editCloud}
                    />
                </Grid.Column>
                <CreateCloud
                 open={this.state.createModalOpen}
                 closeModal={this.closeCreateModal}
                 addCloud={this.addCloud}
                 ref={this.createCloudFormRef}
                />
                <EditCloudModal
                    open={this.state.editModalOpen}
                    updateCloud={this.updateCloud}
                    cloudToEdit={this.state.cloudToEdit}
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
                You must be logged in to see your local weather.
            </Grid>
            }
        </div>
      )
    }
}

export default CloudContainer;