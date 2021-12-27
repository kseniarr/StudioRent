import Header from "../components/Header";
import { UserContext } from "../App";
import { useContext } from "react";

const NotFound = () => {
    const userData = useContext(UserContext);
    return <>
        <Header UserLoggedIn = { userData.email !== '' }/>
        <h1>404 Not Found</h1>
    </>
}

export default NotFound;