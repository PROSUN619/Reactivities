import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default observer (function ActivityDetails() {
    //make function observer so that they can observe store variable
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity,loadingInitial } = activityStore; // here :activity used as alias
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);



    if (loadingInitial || !activity) return <LoadingComponent />;

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
                    <Button as={Link} to={`/manage/${activity.id}`}  basic color='blue' content='Edit' />
                    <Button as={Link} to='/activities'  basic color='blue' content='Cancel' />
                    {/* ()=> not required if we are note using parameter here */}
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
})