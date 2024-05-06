import { Typography, Paper, IconButton, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchTrainingsWithCustomers, handleDeleteTraining } from "../fetchAPI";
import { useEffect, useState } from "react";
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

    //Add theme colours
    const theme = useTheme();

    //State to store training list data
    const [trainigsCustData, setTrainingsCustData] = useState([]);

    //set coldefs
    const [colDefs] = useState([
        { field: 'activity', filter: true },
        { field: 'date', filter: true, cellRenderer: (dateOld) => dateFormatter(dateOld.value) }, //formatting date and time to right form
        { field: 'duration', filter: true },
        { field: 'customer.firstname', filter: true, headerName: 'Firstname' },
        { field: 'customer.lastname', filter: true, headerName: 'Lastname' },
        { 
            cellRenderer: params => 
            <IconButton size="small" 
                color="error" 
                onClick={() => deleteTraining(params.data.id)}
                style={{ color: theme.palette.secondary.dark }}>
                <DeleteIcon />
            </IconButton>, width: 90, headerName: 'Delete'
        }
    ]);

    useEffect(() => {
        fetchTrainingsCustList();
    }, []);

    const fetchTrainingsCustList = () => {
        fetchTrainingsWithCustomers()
        .then(data => setTrainingsCustData(data))
        .catch((err) => console.error(err));
    }

     //Fetch function calling API function to delete training
    const deleteTraining = (url) => {
       handleDeleteTraining(url) //imported from fetchAPI.js
        .then(() => fetchTrainingsCustList())
        .catch(err => console.error(err))
    }

    return(
        <>
       <Paper><Typography variant="h1">This is a list of trainings</Typography></Paper>
       <Paper>
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                    rowData={trainigsCustData}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </Paper> 

        </>
    );
}