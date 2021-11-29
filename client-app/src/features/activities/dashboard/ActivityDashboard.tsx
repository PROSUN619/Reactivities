import { observer } from "mobx-react-lite";
import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";


export default observer(function ActivityDashBoard() {

    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore; //de structuring the activityStore

    return (
        <Grid>
            <GridColumn width="10">
                <ActivityList />
            </GridColumn>
            <GridColumn width="6">
                {selectedActivity && !editMode &&// this means if activities[0] && is not null then only execute 
                    <ActivityDetails />}
                {editMode &&
                    <ActivityForm/>}
            </GridColumn>
        </Grid>
    )
})