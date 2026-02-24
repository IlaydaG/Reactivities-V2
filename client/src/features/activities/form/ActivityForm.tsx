import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { type FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
  const today = new Date().toISOString().split('T')[0]; //tarih için 

  const {id} = useParams();
  const { updateActivity, createActivity ,activity ,isLoadingActivity} = useActivities(id);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { 
    event.preventDefault(); 
  
  const formData = new FormData(event.currentTarget); 
  const activityData: IActivity = { 
    id: activity?.id, // edit ise mevcut id 
    title: formData.get('title') as string, 
    description: formData.get('description') as string, 
    category: formData.get('category') as string, 
    date: formData.get('date') as string, 
    city: formData.get('city') as string, 
    venue: formData.get('venue') as string, 
    isCancelled: false, 
    latitude: 0, 
    longitude: 0 };
  
    const data :{[key:string]: FormDataEntryValue}={} 
      formData.forEach((value,key) => 
        { data[key]= value; }); 
    
    if (activity) { 
      await updateActivity.mutateAsync(activityData); 
      navigate(`/activities/${activity.id}`); 
    } 
      else { 
        createActivity.mutate(activityData,{ 
          onSuccess:(id) => { 
            navigate(`/activities/${id}`) 
          } 
        }); 
      } 
  };

  

  if(isLoadingActivity) return <Typography>Loading...</Typography>

  return (
    <Paper sx={{borderRadius:3, padding:3}}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? 'Edit activity' : 'Create activity'}
      </Typography>

      <Box component='form' onSubmit={handleSubmit}
           display='flex' flexDirection='column' gap={3}>

        <TextField name='title' label='Title' defaultValue={activity?.title}/>
        <TextField name='description' label='Description' multiline rows={3} defaultValue={activity?.description}/>
        <TextField name='category' label='Category' defaultValue={activity?.category}/>
        <TextField
          name='date'
          label='Date'
          type='date'
          defaultValue={
            activity?.date?.split('T')[0] ?? today
          }
        />
        <TextField name='city' label='City' defaultValue={activity?.city}/>
        <TextField name='venue' label='Venue' defaultValue={activity?.venue}/>

        <Box display='flex' justifyContent='end' gap={3}>
          <Button color="inherit">
            Cancel
          </Button>

          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}