import { 
    Button, 
    TextField, 
    Dialog, 
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    useTheme
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import 'dayjs/locale/fi';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AddTrainingCustomer({data, handleSave}) {

    //Add theme colours
    const theme = useTheme();
    
    //State for dialog box to be open/closed
    const [dialogOpen, setDialogOpen] = useState(false); 

    //State for storing trainig
    const [trainig, setTraining] = useState({
        date: '',
        activity: '',
        dutarion: '',
        customer: data._links.customer.href
    });

    //callback function to set dialog box open
    const handleClickOpen = () => {
        setDialogOpen(true);
    }

    //callback function to set dialog box closed
    const handleClickClose = () => {
        setDialogOpen(false);
    }

    //callback function to call handleSave function and close dialog box when save is clicked
    const handleClickSave = () => {
        handleSave(trainig);
        handleClickClose();
    }

    return(
        <>
            <IconButton variant="outlined" onClick={handleClickOpen} style={{ color: theme.palette.secondary.light }}>
                <AddCircleOutlineIcon/>
            </IconButton>
            <Dialog 
            open={dialogOpen}
            onClose={handleClickClose}
            >
                <DialogTitle>Add a new workout for {data.firstname} {data.lastname} </DialogTitle> {/*SDisplay also name of the selected customer in the headline*/}
                <DialogContent>
                    <DialogContentText>Fill in all information and press save. Select cancel to exit witout daving.</DialogContentText>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi"> {/*Setting locale to Finland, so that week starts from monday*/}
                        <DateTimePicker
                            ampm={false}
                            inputFormat="DD.MM.YYYY HH:mm"
                            label="Date and Time"
                            selected={trainig.date}
                            fullWidth
                            variant="standard"
                            onChange={(date) => setTraining({ ...trainig, date: date.toISOString() })}
                        />
                    </LocalizationProvider>
                    <TextField
                    required
                    margin="dense"
                    fullWidth
                    variant="standard" 
                    label ="Activity" 
                    value={trainig.activity}
                    onChange={e => setTraining({...trainig, activity: e.target.value})}
                    />
                    <TextField
                    required
                    margin="dense"
                    fullWidth
                    variant="standard"  
                    label ="Duration" 
                    value={trainig.dutarion}
                    onChange={e => setTraining({...trainig, dutarion: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' onClick={handleClickClose}>Cancel</Button>
                    <Button variant='outlined' onClick={handleClickSave} >Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
