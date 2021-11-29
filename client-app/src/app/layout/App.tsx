import React, { Fragment, useEffect } from 'react';
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  const { activityStore } = useStore(); // {} class type
  // use react hooks useState to save the state

  useEffect(() => {  // hook to set effect on state
    activityStore.loadActivities();
  }, [activityStore]) // use [] other wise it will be an endless loop // pass it as dependancy



  if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

  return (
    <Fragment >
      <NavBar />

      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
}

export default observer(App); // observer will make the app function observe to activitystore
