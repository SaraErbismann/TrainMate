import { 
    Paper, 
    Typography, 
    Button
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getCustomers, handleAddCustomers, handleUpdateCustomers, handleDeleteCustomers } from "../fetchAPI";
import { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";


export default function Customers() {

    //State to store customer data
    const [customerData, setCustomerData] = useState([]);

    //set coldefs
   const [colDefs] = useState([
        { field: 'firstname', filter: true, width: 100},
        { field: 'lastname', filter: true, width: 100},
        { field: 'streetaddress', filter: true},
        { field: 'postcode', filter: true, width: 100},
        { field: 'city', filter: true, width: 100},
        { field: 'email', filter: true},
        { field: 'phone', filter: true},
        { 
            cellRenderer: params => 
            <EditCustomer data={params.data} updateCustomer={updateCustomer} />, 
            width: 120 
        },
        { 
            cellRenderer: params => 
            <Button size="small" 
                color="error" 
                onClick={() => deleteCustomer(params.data._links.customer.href)}>
                Delete
            </Button>, width: 100 
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