import ActivityCard from './ActivityCard'
import { Box } from '@mui/material'

type Props = {
  activities: IActivity[]
  selectActivity : (id:string ) => void;
}

function ActivityList({ activities, selectActivity }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activities.map(activity => (
        <ActivityCard 
          key={activity.id} 
          activity={activity} 
          selectActivity ={selectActivity}
        />
      ))}
    </Box>
  )
}

export default ActivityList