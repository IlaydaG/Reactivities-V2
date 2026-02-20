import { useEffect, useState } from 'react'
import { Box, Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashBoard';

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:7285/api/activities')
    .then(response => setActivities(response.data))
  },  [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id ===id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id? : string) =>{
    if(id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  }
  const handleFormClose = ()=>{
    setEditMode(false);
  }

  const handleSubmitForm =(activity : IActivity) =>{
    if (activity.id){
      setActivities(activities.map(x =>x.id === activity.id ? activity:x))
       setSelectedActivity(activity); 
    }
    else{
      const newActivity ={...activity, id: activities.length.toString()}
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity])
    }
    setEditMode(false);
  }

  const handleDelete = (id:string) =>{
    setActivities(activities.filter(x =>x.id !==id))
  }


  return (
    <Box sx={{bgcolor:'#eeeeee'}}>
     <CssBaseline /> {/*navbarın sağdan sola ve üstü doldurması anlamına gelir */}
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{mt:3}}>
        <ActivityDashBoard 
        activities={activities}
        selectActivity={handleSelectActivity}
        cancelSelectActivity = { handleCancelSelectActivity}
        selectedActivity={selectedActivity}
        editMode={editMode}
        openForm={handleOpenForm}
        closeForm={handleFormClose}
        submitForm ={handleSubmitForm}
        deleteActivity = {handleDelete}
        />
      </Container>
      
    </Box>
  )
}

export default App
