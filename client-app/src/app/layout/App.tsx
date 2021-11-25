import React, { Fragment, useEffect, useState } from 'react';
//import { ducks } from './demo';
//import { DuckItem } from './DuckItem';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { ActivityDashBoard } from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  // use react hooks useState to save the state
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {  // hook to set effect on state
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(Response => {
      //console.log(Response);
      setActivities(Response.data);
    })
  }, []) // use [] other wise it will be an endless loop

  function handleSelectActivity(id: String) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrDeleteActivity(activity: Activity){
    activity.id
    ? setActivities([...activities.filter(x => x.id !== activity.id),activity])
    :setActivities([...activities,{...activity, id: uuid()}]) // ... is spread operator set the guid
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  return (
    <Fragment >
      <NavBar openForm={handleFormOpen} />

      <Container style={{ marginTop: '7em' }}>
        <ActivityDashBoard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrDeleteActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
