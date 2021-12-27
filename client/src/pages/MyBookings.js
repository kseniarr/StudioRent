import { useContext } from "react";
import Header from "../components/Header";
import { UserContext } from "../App";

const MyBookings = () => {
    const userData = useContext(UserContext);
    return <div>
        <Header UserLoggedIn = { userData.email !== '' }/>
        <h1>My Bookings!</h1>
        <p>currUser: { userData.firstName }</p>
    </div>;
}

export default MyBookings;