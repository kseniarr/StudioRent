import Header from "../components/Header";
import { UserContext } from "../App";
import { useContext } from "react";

const Settings = () => {
    const userData = useContext(UserContext);
    return <>
        <Header UserLoggedIn = { userData.email !== '' }/>
    </>
}

export default Settings;