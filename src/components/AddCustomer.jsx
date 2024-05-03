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
import AddIcon from '@mui/icons-material/Add';

export default function AddCustomer({handleSave}) {
    
    //State for add customer dialog box open/closed
    const [addDialogOpen, setAddDialogOpen] = useState(false); 

    //State for storing new customers
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    //callback function to set dialog box open
    const handleClickOpen = () => {
        setAddDialogOpen(true);
    }

    //State for storing trainig
    const handleClickClose = () => {
        setAddDialogOpen(false);
        console.log("PING: handle click close: " + addDialogOpen);
    }

    //callback function to call handleSave function and close dialog box when save is clicked
    const handleClickSave = () => {
        handleSave(customer)
        handleClickClose();
        console.log("PING: handle click save " + addDialogOpen);
    }

    

    return(
        <>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon/>}>
                Add new
            </Button>
            <Dialog 
            open={addDialogOpen}
            onClose={handleClickClose}
            >
                <DialogTitle>Add new customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>Fill in all information and press save. Select cancel to exit witout daving.</DialogContentText>
                    <TextField 
                    required
                    margin="dense"
                    fullWidth
                    variant="standard"
                    label ="First name" 
                    value={customer.firstname}
                    onChange={e => setCustomer({...customer, firstname: e.target.value})}
                    />
                    <TextField
                    required
                    margin="dense"
                    fullWidth
                    variant="standard" 
                    label ="Last name" 
                    value={customer.lastname}
                    onChange={e => setCustomer({...customer, lastname: e.target.value})}
                    />
                    <TextField
                    required
                    margin="dense"
                    fullWidth
                    variant="standard" 
                    label ="Street address" 
                    value={customer.streetaddress}
                    onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                    />
                    <TextField
                    required
                    margin="dense"
                    fullWidth
                    variant="standard"  
                    label ="Postcode" 
                    value={customer.postcode}
                    onChange={e => setCustomer({...customer, postcode: e.target.value})}
                    />
                    <TextField 
                    required
                    margin="dense"
                    fullWidth
                    variant="standard" 
                    label ="City" 
                    value={customer.city}
                    onChange={e => setCustomer({...customer, city: e.target.value})}
                    />
                    <TextField 
                    required
                    margin="dense"
                    fullWidth
                    variant="standard" 
                    label ="Email" 
                    value={customer.email}
                    onChange={e => setCustomer({...customer, email: e.target.value})}
                    />
                    <TextField
                    required
                    margin="dense"
                    fullWidth
                    variant="standard"  
                    label ="Phone" 
                    value={customer.phone}
                    onChange={e => setCustomer({...customer, phone: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' onClick={handleClickClose}>Cancel</Button>
                    <Button variant='outlined' onClick={handleClickSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
