import { Grid} from '@mui/material'
import ActivityList from './ActivityList'


function ActivityDashBoard() {
    

  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList />
      </Grid>
      <Grid size={5}>
         activity filters go here
      </Grid>
    </Grid>
  )
}

export default ActivityDashBoard