import { 
    Paper, 
    Typography, 
    Button,
    IconButton
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { fetchCustomers, handleAddCustomers, handleUpdateCustomers, handleDeleteCustomers, handleAddTrainingToCustomer } from "../fetchAPI";
import { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTrainingCustomer from "./AddTrainingCustomer";
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { CSVLink } from "react-csv";


export default function Customers() {

    //State to store customer data
    const [customerData, setCustomerData] = useState([]);

    //set coldefs
   const [colDefs] = useState([
        { field: 'firstname', filter: true, width: 125, headerName: 'First name'},
        { field: 'lastname', filter: true, width: 125, headerName: 'Last name'},
        { field: 'streetaddress', filter: true, width: 160, headerName: 'Address'},
        { field: 'postcode', filter: true, width: 100},
        { field: 'city', filter: true, width: 120},
        { field: 'email', filter: true, width: 170},
        { field: 'phone', filter: true, width: 140},
        { 
            cellRenderer: params =>
            <AddTrainingCustomer data={params.data} handleSave={addTraining}/>, width: 130, headerName: 'New training'

         },
        { 
            cellRenderer: params => 
            <EditCustomer data={params.data} updateCustomer={updateCustomer} />, width: 85, headerName: 'Edit' 
        },
        { 
            cellRenderer: params => 
            <IconButton size="small" 
                color="error" 
                onClick={() => deleteCustomer(params.data._links.customer.href)}> 
                <DeleteIcon />
            </IconButton>, width: 85, headerName: 'Delete'
        }
    ]);

    //Use useEffect hook to Fetch customer data
    useEffect(() => {
        fetchCustomersList();
    }, []);

    //Fetch function calling API function to fetch customer data
    const fetchCustomersList = () => {
        fetchCustomers() //imported from fetchAPI.js
        .then(data => setCustomerData(data._embedded.customers))
        .catch((err) => console.error(err))
    }

    //Fetch function calling API function to add a new customer
    const addCustomer = (customer) => {
        handleAddCustomers(customer) //imported from fetchAPI.js
        .then(() => fetchCustomersList())
        .catch(err => console.error(err))
    }

    //Fetch function calling API function to update customer data
    const updateCustomer = (url, newData) => {
        handleUpdateCustomers(url, newData) //imported from fetchAPI.js
        .then(() => fetchCustomersList())
        .catch(err => console.error(err))
    }

    //Fetch function calling API function to delete customer
    const deleteCustomer = (url) => {
        handleDeleteCustomers(url) //imported from fetchAPI.js
        .then(() => fetchCustomersList())
        .catch(err => console.error(err))
    }

    //Fetch function calling API function for adding training to a customer
    const addTraining = (newTraining) => {
        handleAddTrainingToCustomer(newTraining) //imported from fetchAPI.js
        .then(() => fetchCustomersList())
        .catch(err => console.error(err))
    }

    const exportData = [
        ['Firstname', 'Lastname', 'Streetaddress', 'Postcode', 'City', 'Email', 'Phone'],
        ...customerData.map(({ firstname, lastname, streetaddress, postcode, city, email, phone }) => [
            firstname,
            lastname,
            streetaddress,
            postcode,
            city,
            email,
            phone,
        ]),
    ];

    return(
        <>
        <Paper>
            <Typography variant="h1">This is a list of customers</Typography>
            <AddCustomer handleSave={addCustomer} />
            <CSVLink data={exportData} filename="Customer_Data.csv" >
                <Button variant="outlined" startIcon={<FileDownloadIcon />}>Export</Button>
            </CSVLink> 
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