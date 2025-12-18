import { useEffect, useState } from 'react'
import './App.css'
import { ListItem, Typography } from '@mui/material';
import axios from 'axios';

function App() {
   const [activities, setActivities] = useState<IActivity[]>([]);
  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:7285/api/activities')
    .then(response => setActivities(response.data))
  },  [])

  //const title = 'Welcome to Reactivities'
  return (
    <>
      {/* <h3 className='app' style={{color:'red'}}>{title}</h3> */}
      <Typography variant='h3' className='app' style={{color:'red'}} >Reactivities</Typography>
      <ul>
        {activities.map((activity )=>(
          <ListItem key={activity.id}>{activity.title}</ListItem>
        ))}
      </ul>
    </>
  )
}

export default App
