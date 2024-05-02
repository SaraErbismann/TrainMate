import { 
    Paper, 
    Typography, 
    Button
} from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { getCustomers } from "../fetchAPI";
import { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";


export default function Customers() {

    //State for edit customer dialog box open/closed
    const [editDialogOpen, setEditDialogOpen] = useState(false); 

    //State to store customer data
    const [customerData, setCustomerData] = useState([]);

    //set coldefs
   const [colDefs] = useState([
        { field: 'firstname', filter: true, width: 120},
        { field: 'lastname', filter: true, width: 100},
        { field: 'streetaddress', filter: true, width: 100},
        { field: 'postcode', filter: true},
        { field: 'city', filter: true},
        { field: 'email', filter: true},
        { field: 'phone', filter: true},
        /*{ cellRenderer: params => <EditCar data={params.data} updateCar={updateCar} />, width: 120 },
        { cellRenderer: params => 
        <Button size="small" color="error" onClick={() => deleteCar(params.data._links.car.href)}>
            Delete
        </Button>, width: 100 }*/
    ]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        getCustomers()
        .then(data => setCustomerData(data._embedded.customers))
        .catch((err) => console.error(err));
    }
    
    return(
        <>
        <Paper>
            <Typography variant="h1">This is a list of customers</Typography>
            <AddCustomer />
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