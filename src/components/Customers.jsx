import { 
    Paper, 
    Typography, 
    Button,
    IconButton
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getCustomers, handleAddCustomers, handleUpdateCustomers, handleDeleteCustomers } from "../fetchAPI";
import { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTrainingCustomer from "./AddTrainingCustomer";
import DeleteIcon from '@mui/icons-material/Delete';


export default function Customers() {

    //State to store customer data
    const [customerData, setCustomerData] = useState([]);

    //set coldefs
   const [colDefs] = useState([
        { field: 'firstname', filter: true, width: 100},
        { field: 'lastname', filter: true, width: 100},
        { field: 'streetaddress', filter: true, width: 120},
        { field: 'postcode', filter: true, width: 100},
        { field: 'city', filter: true, width: 100},
        { field: 'email', filter: true},
        { field: 'phone', filter: true, width: 140},
        { 
            cellRenderer: params =>
            <AddTrainingCustomer data={params.data} handleSave={addTraining}/>,

         },
        { 
            cellRenderer: params => 
            <EditCustomer data={params.data} updateCustomer={updateCustomer} />, width: 90 
        },
        { 
            cellRenderer: params => 
            <IconButton size="small" 
                color="error" 
                onClick={() => deleteCustomer(params.data._links.customer.href)}>
                <DeleteIcon />
            </IconButton>, width: 90
        }
    ]);

    //Use useEffect hook to Fetch customer data
    useEffect(() => {
        fetchCustomers();
    }, []);

    //Fetch function calling API function to fetch customer data
    const fetchCustomers = () => {
        getCustomers() //imported from fetchAPI.js
        .then(data => setCustomerData(data._embedded.customers))
        .catch((err) => console.error(err));
    }

    //Fetch function calling API function to add a new customer
    const addCustomer = (customer) => {
        handleAddCustomers(customer) //imported from fetchAPI.js
        .then(() => fetchCustomers())
        .catch(err => console.error(err));
    }

    //Fetch function calling API function to update customer data
    const updateCustomer = (url, newData) => {
        handleUpdateCustomers(url, newData) //imported from fetchAPI.js
        .then(() => fetchCustomers())
        .catch(err => console.error(err));
    }

    //Fetch function calling API function to delete customer
    const deleteCustomer = (url) => {
        handleDeleteCustomers(url) //imported from fetchAPI.js
        .then(() => fetchCustomers())
        .catch(err => console.error(err));
    }

    const addTraining = () => {
        console.log("Jee");
    }


    return(
        <>
        <Paper>
            <Typography variant="h1">This is a list of customers</Typography>
            <AddCustomer handleSave={addCustomer} />
        </Paper>
        <Paper>            
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={customerData}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div> 
        </Paper>

        </>
    );
}