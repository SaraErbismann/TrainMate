import { 
    Typography,  
    IconButton, 
    useTheme,     
    Card,
    CardContent,
    CardMedia,
    Stack 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchTrainingsWithCustomers, handleDeleteTraining } from "../fetchAPI";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from 'dayjs';
import workout_img_2 from '../assets/workout_img_2.jpg';

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
            <Card sx={{ mb: 2 }} >
                <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                >
                    <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                    >
                        <CardMedia
                            style={{ width: '400px'}}
                            image={workout_img_2}
                            title = "Workout illustration"
                            component="img"
                        />
                        <Typography variant="caption" align="center">
                            <a href="https://www.freepik.com/free-vector/healthy-lifestyle-concept-illustration_22378356.htm#fromView=image_search_similar&page=1&position=5&uuid=73bbe615-8dda-457a-b6a2-f2cf415aef59">
                            Image by storyset on Freepik
                            </a>
                        </Typography>
                    </Stack>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Step into our Trainings page! 
                        </Typography>
                        <Typography variant="body1">
                            Explore your list of trainings alongside customer details, and effortlessly delete any outdated entries. Simplify your workflow and stay on track with your training sessions effortlessly.   
                        </Typography>
                    </CardContent>
                </Stack>
            </Card>
            <div className="ag-theme-material" style={{ height: 600 }}>
                <AgGridReact
                rowData={trainigsCustData}
                columnDefs={colDefs}
                pagination={true}
                paginationAutoPageSize={true}
                />
            </div>

        </>
    );
}