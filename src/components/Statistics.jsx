import { 
    Typography, 
    useTheme,     
    Card,
    CardContent,
    CardMedia,
    Stack  
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { fetchTrainings } from "../fetchAPI";
import { useEffect, useState } from "react";
import _ from 'lodash';
import workout_img_1 from '../assets/workout_img_1.jpg';

export default function Statistics() {

    //Add theme colours
    const theme = useTheme();

    // empty state for storing data to be displayed in the chart
    const [data, setData] = useState([]);

        //useEffect hook and function for fetching event dta to calendar
        useEffect(() => {
            fetchChartData();
        }, []);
    
        const fetchChartData = () => {
            fetchTrainings()
            .then(data => setData(data._embedded.trainings))
            .catch(err => console.error(err))
        }

        //Group data by activity type
        const groupedData = _.groupBy(data, 'activity');

        //Sum durations 
        const sumGroupedData = _.map(groupedData, (activities, activity) =>({
            activity,
            duration: _.sumBy(activities, 'duration'),
        }));

        // converting duration data types to integers
        const chartData = sumGroupedData.map(i => ({
            activity: i.activity,
            duration: Number(i.duration)
        }));


    return(
        <>
            <Card sx={{ mb: 2 }}>
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
                            image={workout_img_1}
                            title = "Workout illustration"
                            component="img"
                        />
                        <Typography variant="caption" align="center">
                            <a href="https://www.freepik.com/free-vector/stretching-exercises-concept-illustration_25182825.htm#fromView=search&page=2&position=26&uuid=73bbe615-8dda-457a-b6a2-f2cf415aef59">
                                Image by storyset on Freepik
                            </a>
                        </Typography>
                    </Stack>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Welcome to our Statistics page! 
                        </Typography>
                        <Typography variant="body1">
                            Here, you will find insightful data visualizations to track and analyze your training activities. Stay ahead of the game with actionable insights.
                        </Typography>
                    </CardContent>
                </Stack>
            </Card>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                style={{ fontFamily: theme.typography.fontFamily }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis> 
                        <Label angle={-90} value="Duration in minutes" position="insideLeft"/>
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill={theme.palette.primary.main} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}