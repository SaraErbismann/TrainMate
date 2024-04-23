import { useRouteError } from "react-router-dom";

export default function Error() {

    const error = useRouteError();
    console.log(error);

    return(
        <>
        <h1>Oops!</h1>
        <p>Page not found.</p>
        <p>{error.data}</p>
        </>
    );
}