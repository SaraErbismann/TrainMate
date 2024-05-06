import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { fetchTrainingsWithCustomers } from "../fetchAPI";
import { Paper, Typography, useTheme } from "@mui/material";


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
            const firstName = event.customer.firstname || "Name missing"; //set up first name of the customer for the event or name missing if there is no name
            const lastName = event.customer.lastname || "Name missing"; //set up last name of the customer for the event or name missing if there is no name
    
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
        backgroundColor: theme.palette.primary.main,
    };

    return(
        <>
        <Typography>This is calendar page</Typography>
        <Paper>
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
        </Paper>

        </>
    );
}
