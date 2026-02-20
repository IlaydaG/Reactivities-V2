import { Grid} from '@mui/material'
import ActivityList from './ActivityList'
import ActivityDetail from '../details/ActivityDetail'
import ActivityForm from '../form/ActivityForm'

type Props = {
  activities: IActivity[]
  selectActivity : (id:string ) => void;
  cancelSelectActivity :() => void;
  selectedActivity?: IActivity | undefined;
  openForm : (id: string)=> void;
  closeForm : () => void;
  editMode: boolean;
  submitForm: (activity:IActivity) => void;
  deleteActivity :(id: string) => void;
}

function ActivityDashBoard({ activities, selectActivity,cancelSelectActivity,selectedActivity,
  openForm,closeForm,editMode,submitForm ,deleteActivity }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList 
        activities={activities}
        selectActivity ={selectActivity}
        deleteActivity ={deleteActivity}
        />
      </Grid>
      <Grid size={5}>
         {selectedActivity && !editMode &&
         <ActivityDetail 
            activity={selectedActivity}
            cancelSelectActivity ={cancelSelectActivity}
            openForm = {openForm}
         />}
         {editMode &&
         <ActivityForm 
         closeForm ={closeForm} 
         activity={selectedActivity} 
         submitForm={submitForm}/>}
      </Grid>
    </Grid>
  )
}

export default ActivityDashBoard