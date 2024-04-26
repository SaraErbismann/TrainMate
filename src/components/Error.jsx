import { Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function Error() {

    const error = useRouteError();
    console.log(error);

    return(
        <>
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="body1">This is home page</Typography>
        <Typography variant="body1">{error.data}</Typography>
        </>
    );
}