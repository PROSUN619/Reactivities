import React from "react";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity}  = activityStore; // here :activity used as alias
    
    if (!activity) return <LoadingComponent/>;

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
                    <Button onClick={cancelSelectedActivity} basic color='blue' content='Cancel'/>
                    {/* ()=> not required if we are note using parameter here */}
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}