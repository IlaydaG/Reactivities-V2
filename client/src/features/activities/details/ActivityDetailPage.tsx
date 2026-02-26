import {  Typography,  Grid} from '@mui/material'
import { useActivities } from '../../../lib/hooks/useActivities';
import ActivityDetailSidebar from './ActivityDetailSidebar';
import ActivityDetailsHeader from './ActivityDetailsHeader';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsInfo from './ActivityDetailsInfo';
import { useParams } from 'react-router';



function ActivityDetailPage() {
    const {id} = useParams();
    const {activity, isLoadingActivity}= useActivities(id);

    if(isLoadingActivity) return <Typography>Loading...</Typography>
    if(!activity) return <Typography>Activity not Found...</Typography>

  return (
    <Grid container spacing={3}>
       <Grid size={8}>
            <ActivityDetailsHeader activity={activity}/>
            <ActivityDetailsInfo activity={activity} />
            <ActivityDetailsChat />
       </Grid>
       <Grid size={4}>
        <ActivityDetailSidebar/>
       </Grid>
    </Grid>
  )
}

export default ActivityDetailPage