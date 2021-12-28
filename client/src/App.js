import React, { useState, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyBookings from './pages/MyBookings';
import { Route, Routes} from 'react-router';
import NotFound from './pages/NotFound';
import { createContext } from 'react';
import Logout from './pages/Logout';

export const UserContext = createContext({
    email: "",
    firstName: "",
    lastName: "",
    setEmail: () => {},
    setFirstName: () => {},
    setLastName: () => {}
});

function App() {
    const [userData, setUserData] = useState({
                        email: "",
                        firstName: "",
                        lastName: "",
                        setEmail: () => {},
                        setFirstName: () => {},
                        setLastName: () => {}
                    });

    return (
        <UserContext.Provider value = { userData }> 
                <BrowserRouter>
                <Routes>
                    <Route path = "/" element = { <Home/> }/>
                    <Route path = "/login" element = { <Login/> }/>
                    <Route exact path = "/logout" element = { <Logout/> }/>
                    <Route path = "/signup" element = { <Signup/> }/>
                    <Route path = "/mybookings" element = { <MyBookings/> }/>
                    <Route path = "*" element = { <NotFound/> }/>
                </Routes>
                </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
