import { 
    Button, 
    TextField, 
    Dialog, 
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { useState } from "react";

export default function AddTrainingCustomer({data, handleSave}) {
    
    //State for dialog box to be open/closed
    const [dialogOpen, setDialogOpen] = useState(false); 

    //State for storing trainig
    const [trainig, setTraining] = useState({
        date: '',
        activity: '',
        dutarion: '',
        customer: ''
    });

    const handleClickOpen = () => {
        setDialogOpen(true);
        setTraining({
            date: '',
            activity: '',
            dutarion: 0,
            customer: data._links.customer.href
        });
    }

    const handleClickClose = () => {
        setDialogOpen(false);
    }

   /* const handleClickSave = (url) => {
        handleSave(url)
        .then(() => handleClickClose())
        .catch(err => console.error(err));
    }*/

    return(
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add workout
            </Button>
            <Dialog 
            open={dialogOpen}
            onClose={handleClickClose}
            >
                <DialogTitle>Add a new workout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Fill in all information and press save. Select cancel to exit witout daving.</DialogContentText>
                    <TextField 
                    required
                    margin="dense"
                    fullWidth
                    variant="standard"
                    label ="Date" 
                    value={trainig.date}
                    onChange={e => setTraining({...trainig, date: e.target.value})}
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
                    <Button variant='outlined' >Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
