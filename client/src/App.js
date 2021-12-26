import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import Settings from './pages/Settings';
import { Route, Routes} from 'react-router';
import NotFound from './pages/NotFound';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = { <Home/> }/>
                <Route path = "/login" element = { <Login/> }/>
                <Route path = "/mybookings" element = { <MyBookings/> }/>
                <Route path = "/settings" element = { <Settings/> }/>
                <Route path = "*" element = { <NotFound/> }/>
            </Routes>
            
        </BrowserRouter>
    );
}

export default App;
