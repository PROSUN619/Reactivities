import React, { Fragment } from 'react';
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {

  const location = useLocation();

  return (
    <Fragment >
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>{/* short hand expression for fragment */}
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                {/* add key to activity form to reload reload component when key changes*/}
              </Route>
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default observer(App); // observer will make the app function observe to activitystore
