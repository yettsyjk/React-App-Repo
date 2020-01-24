import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function CloudList(props){
    console.log(props)
    const cloudsList = props.clouds.map((cloud) => {
        return (
            <Card key={cloud.id}>
                <Card.Content>
        <Card.Header>{cloud.city}</Card.Header>
                    <Card.Description>{cloud.us_state}</Card.Description>
                    <Card.Description>{cloud.weather}</Card.Description>
                    <Card.Description>{cloud.temp}</Card.Description>
                    <Card.Description image='https://img.icons8.com/cute-clipart/64/000000/cloud.png'></Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => props.deleteCloud(cloud.id)}>Delete Your Local Weather</Button>
                    <Button onClick={() => props.editCloud(cloud.id)}>Edit Weather in Your Area</Button>
                </Card.Content>
            </Card>
        )
    })
    return(
    <Card.Group centered>{cloudsList}</Card.Group>
    )
}
export default CloudList;