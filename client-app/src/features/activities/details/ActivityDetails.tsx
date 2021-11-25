import React from "react";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
    activity : Activity;
    cancelSelectActivity: () => void;
    openForm: (id:string) => void;
}

export default function ActivityDetails({activity, cancelSelectActivity, openForm} : Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    {activity.date}
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup>
                    <Button basic onClick={()=> openForm(activity.id)} color='blue' content='Edit'/>
                    <Button onClick={cancelSelectActivity} basic color='blue' content='Cancel'/>
                    {/* ()=> not required if we are note using parameter here */}
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}