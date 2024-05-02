import { 
    Button, 
    TextField, 
    Dialog, 
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import 'dayjs/locale/fi';

export default function AddTrainingCustomer({data, handleSave}) {

    
    //State for dialog box to be open/closed
    const [dialogOpen, setDialogOpen] = useState(false); 

    //State for storing trainig
    const [trainig, setTraining] = useState({
        date: '',
        activity: '',
        dutarion: '',
        customer: data._links.customer.href
    });

    
    const handleClickOpen = () => {
        setDialogOpen(true);
    }

    const handleClickClose = () => {
        setDialogOpen(false);
    }

    const handleClickSave = () => {
        handleSave(trainig);
        handleClickClose();
    }

    return(
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add workout
            </Button>
            <Dialog 
            open={dialogOpen}
            onClose={handleClickClose}
            >
                <DialogTitle>Add a new workout for</DialogTitle>
                <DialogContent>
                    <DialogContentText>Fill in all information and press save. Select cancel to exit witout daving.</DialogContentText>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
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
                    label ="Date and TIme" 
                    value={trainig.date}
                    />
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
