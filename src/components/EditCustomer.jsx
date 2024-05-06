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
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

export default function EditCustomer({data, updateCustomer}) {

    //Add theme colours
    const theme = useTheme();
    
    //State for edit customer dialog box open/closed
    const [editDialogOpen, setEditDialogOpen] = useState(false); 

    //State for storing customer ddata
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    //Set row data (received as a prop) to the form 
    const handleClickOpen = () => {
        setEditDialogOpen(true);
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city,
            email: data.email,
            phone: data.phone
        });
    }

    const handleClickClose = () => {
        setEditDialogOpen(false);
    }

    const handleClickSave = () => {
        updateCustomer(data._links.customer.href, customer);
        handleClickClose();
    }

    return(
        <>
            <IconButton variant="outlined" size="small" onClick={handleClickOpen} style={{ color: theme.palette.secondary.light }}>
                <EditIcon />
            </IconButton>
            <Dialog 
            open={editDialogOpen}
            onClose={handleClickClose}
            >
                <DialogTitle>Update customer info</DialogTitle>
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