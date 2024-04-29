import { Typography } from "@mui/material";
import { trainingsCustFetch } from "../fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';

// Function for formatting dates in the grid
const dateFormatter = (dateOldFormat) => {
    const dateNewFormat = dayjs(dateOldFormat).format('D.M.YYYY HH:mm');
    return dateNewFormat;
}

export default function Trainings() {

    //set coldefs
    const [colDefs] = useState([
        { field: 'activity', filter: true },
        { field: 'date', filter: true, cellRenderer: (dateOld) => dateFormatter(dateOld.value) }, //formatting date and time to right form
        { field: 'duration', filter: true },
        { field: 'customer.firstname', filter: true, headerName: 'Firstname' },
        { field: 'customer.lastname', filter: true, headerName: 'Lastname' },
    ]);

    //useQuery for trainingsCustFetch (Training data with customer info)
    const {isLoading, isSuccess, data} = useQuery({
        queryKey: ['trainings'],
        queryFn: trainingsCustFetch,
    });

    //if isLoading is true, render Loading text
    if (isLoading) {
        return <Typography variant="p">Loading...</Typography>
    }


    //Note: conditional rendering: If the query has been succesfull, render AG grid, if not render no data text
    return(
        <>
        <Typography variant="h1">This is a list of trainings</Typography>
        {isSuccess ?
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={data}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div> :
            <Typography variant="p">No data</Typography>}
        </>
    );
}