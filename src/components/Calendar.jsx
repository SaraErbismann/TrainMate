import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { fetchTrainingsWithCustomers } from "../fetchAPI";
import {  
    Typography, 
    useTheme,     
    Card,
    CardContent,
    CardMedia,
    Stack 
} from "@mui/material";
import time_img from '../assets/time_img.jpg';


export default function Calendar() {

    //Add theme colours
    const theme = useTheme();

    const localizer = momentLocalizer(moment);
    
    //empty state for storing calendar events
    const [events, setEvents] = useState([]);

    //useEffect hook for fetching event dta to calendar
    useEffect(() => {
        fetchCalendarEvents();
    }, []);

    //CAlendar event function
    const fetchCalendarEvents = () => {
        fetchTrainingsWithCustomers()
        .then(data => setEvents(data))
        .catch(err => console.error(err))
    }

    //function to format the events shown in the calendar
    const formatEvents = (event) => {
        return event.map(event => {
            const firstName = event.customer?.firstname || "Name missing"; //set up first name of the customer for the event or name missing if there is no name
            const lastName = event.customer?.lastname || "Name missing"; //set up last name of the customer for the event or name missing if there is no name
    
            //return formatted event with name details, event start time and event end time
            return {
                title: event.activity + ": " + firstName + " " + lastName,
                start: new Date(event.date),
                end: moment(event.date).add(event.duration, 'minutes'),
            };
        });
    };

    //calendar events, the formatting function is called with the data stored in the state events
    const calendarEvents = formatEvents(events);

    //
    const calendarFormat = {
        timeGutterFormat: 'H:mm', 
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            localizer.format(start, 'H:mm', culture) + ' - ' +
            localizer.format(end, 'H:mm', culture), 
        agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
            localizer.format(start, 'H:mm', culture) + ' - ' +
            localizer.format(end, 'H:mm', culture)
    };

    const eventStyle = {
        backgroundColor: theme.palette.secondary.light,
    };

    return(
        <>
            <Card sx={{ mb: 2 }}>
                <Stack
                direction={{ xs: 'column', md: 'row' }}
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
                        style={{ width: '300px'}}
                        image={time_img}
                        title = "Clock illustration"
                        component="img"
                        />
                        <Typography variant="caption" align="center">
                            <a href="https://www.freepik.com/free-vector/clock-concept-illustration_33756169.htm#page=6&position=9&from_view=author&uuid=f144860b-459b-46cd-81c0-7ba1aa31a61f">
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

            <BigCalendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            views={['month', 'week', 'day']}
            formats={calendarFormat}
            defaultView="month"
            style={{ margin: "20px", height: 600, fontFamily: theme.typography.fontFamily }}
            eventPropGetter={() => ({ style: eventStyle })}
            />

        </>
    );
}
