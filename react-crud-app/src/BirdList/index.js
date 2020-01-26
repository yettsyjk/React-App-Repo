import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function BirdList(props){
    console.log(props)
    const { birds} = props

    const birdList = birds && birds.map((bird) => {
        return (
            <Card key={bird.id}>
                <Card.Content>
        <Card.Header>{bird.name}</Card.Header>
                    <Card.Description>{bird.breed}</Card.Description>
                    <Card.Description>{bird.owner}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => props.deleteBird(bird.id)}>Delete Your Local Weather</Button>
                    <Button onClick={() => props.editBird(bird.id)}>Edit Weather in Your Area</Button>
                </Card.Content>
            </Card>
        )
    })
    return(
    <Card.Group centered>{birdList}</Card.Group>
    )
}

export default BirdList