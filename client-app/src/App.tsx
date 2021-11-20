import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
//import { ducks } from './demo';
//import { DuckItem } from './DuckItem';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  // user react hooks useState to save the state
  const [activities, setActivities] = useState([]);

  useEffect(() => {  // hook to set effect on state
    axios.get('http://localhost:5000/api/activities').then(Response => {
      console.log(Response);
      setActivities(Response.data);
    })
  }, []) // use [] other wise it will be an endless loop


  return (
    <div >
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
      {activities.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
      </List>            
    </div>
  );
}

export default App;
