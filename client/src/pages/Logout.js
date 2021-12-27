import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";
import { useContext } from 'react';
import { useEffect } from 'react';

const Logout = () => {
    const navigate = useNavigate();
    const userData = useContext(UserContext);

    useEffect(() => {
        navigate("/");
    }, [])

    const logout = () => {
        userData.setEmail(userData.email = "");
        userData.setFirstName(userData.firstName = "");
        userData.setLastName(userData.lastName = "");
    }

    return <>
        <Header UserLoggedIn = { userData.email !== '' }/>
        { logout() }
    </>
}

export default Logout;