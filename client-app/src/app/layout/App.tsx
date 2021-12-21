import React, { Fragment } from 'react';
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {

  const location = useLocation();

  return (
    <Fragment >
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>{/* short hand expression for fragment */}
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch> {/* use switch make route exclusive i.e any one route will load at one time*/}
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                <Route path='/errors' component={TestErrors}/>
                <Route path='/server-error' component={ServerError}/>
                <Route component={NotFound}/>
                {/* add key to activity form to reload reload component when key changes*/}
              </Switch>
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default observer(App); // observer will make the app function observe to activitystore
