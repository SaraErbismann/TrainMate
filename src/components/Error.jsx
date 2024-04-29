import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function Error() {

    //React router error
    const error = useRouteError();
    console.log(error);

    return(
        <>
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="body1">An error occurred.</Typography>
        <Typography variant="body1">{error.data}</Typography>
        </>
    );
}