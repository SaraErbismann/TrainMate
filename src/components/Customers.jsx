import { Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { customersFetch } from "../fetchAPI";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";

export default function Customers() {

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

    //useQuery for customersFetch
    const {isLoading, isSuccess, data} = useQuery({
        queryKey: ['customers'],
        queryFn: customersFetch,
    });

    //if isLoading is true, render Loading text
    if (isLoading) {
        return <Typography variant="p">Loading...</Typography>
    }

    //Note: conditional rendering: If the query has been succesfull, render AG grid, if not render no data text
    return(
        <>
        <Typography variant="h1">This is a list of customers</Typography>
            {isSuccess ?
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={data._embedded.customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div> :
            <Typography variant="p">No data</Typography>}
        </>
    );
}