import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";


export default observer(function ActivityDashBoard() {

    const { activityStore } = useStore();    // {} class type
    const {loadActivities,activityRegistry} = activityStore;
    // use react hooks useState to save the state


    useEffect(() => {  // hook to set effect on state
        if (activityRegistry.size <= 0) loadActivities();
    }, [activityRegistry.size, loadActivities]) // use [] other wise it will be an endless loop // pass it as dependancy



    if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

    return (
        <Grid>
            <GridColumn width="10">
                <ActivityList />
            </GridColumn>
            <GridColumn width="6">
                <ActivityFilters/>
            </GridColumn>
        </Grid>
    )
})