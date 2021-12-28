import React, { useState, useEffect, useContext, useRef } from 'react';
import Header from './../components/Header'
import Button from './../components/Button'
import RoomInfo from './../components/RoomInfo';
import Table from './../components/Table';
import Footer from './../components/Footer';
import { apiUrl } from './../endpoints';
import axios from 'axios';
import { UserContext } from '../App';

const Home = () => {
    const userData = useContext(UserContext);

    const [rooms, setRooms] = useState(null);
    
    const regularBtn = useState("btn");
    const headerBtn = useState("btn headerBtn");
    const activeBtn = useState("btn btnActive");

    const [room1, setRoom1] = useState({class: activeBtn[0]});
    const [room2, setRoom2] = useState({class: regularBtn[0]});
    const [room3, setRoom3] = useState({class: regularBtn[0]});

    const [currRoom, setCurrRoom] = useState(1);

    useEffect(() => {
        axios.get(apiUrl + 'room')
        .then(response => {
            setRooms(response.data);
            setCurrRoom(response.data[0].idRoom);
        })
        .catch(err => console.log(err));
    }, [])

    const chooseRoom = (id) => 
    {
        return function () {
            setCurrRoom(id);
            if (id == rooms[0].idRoom) {
                setRoom1({class: activeBtn[0]});
                setRoom2({class: regularBtn[0]});
                setRoom3({class: regularBtn[0]});
            }
            else if (id == rooms[1].idRoom){
                setRoom1({class: regularBtn[0]});
                setRoom2({class: activeBtn[0]});
                setRoom3({class: regularBtn[0]});
            }
            else{
                setRoom1({class: regularBtn[0]});
                setRoom2({class: regularBtn[0]});
                setRoom3({class: activeBtn[0]});
            }
        };
    }

    const renderBtns = () => {
        if(rooms !== null && currRoom !== null){
            return <div className = "btnDiv">
            <Button state = { room1.class } 
                    text = { rooms[0].title } 
                    onClick = { chooseRoom(rooms[0].idRoom) }
            />
            <Button state = { room2.class } 
                    text = { rooms[1].title } 
                    onClick = { chooseRoom(rooms[1].idRoom) }
            />
            <Button state = { room3.class } 
                    text = { rooms[2].title } 
                    onClick = { chooseRoom(rooms[2].idRoom) }
            />
        </div>;
        }
    }

    const renderRoomInfo = () => {
        if(rooms !== null && currRoom !== null){
            return <RoomInfo info = { rooms[currRoom - 1] }/>;
        }
    }
    return (
            <div className = "Home">
                            <Header UserLoggedIn = { userData.email !== '' }/>
                            <div className = "hero">
                                <h1 className = "header">Аренда танцевальных залов в центре Москвы</h1>
                                <h2>Просторные красивые залы для танцев, йоги, растяжки, мастер-классов, съемок и других мероприятий</h2>
                                <p>кондиционер        вай-фай        муз.колонка с bluetooth        коврики        блоки для йоги</p>
                                <Button state = { headerBtn[0] } text= "Забронировать"/>
                            </div>
                            { renderBtns() }
                            { renderRoomInfo() }
                            <Table roomId = { currRoom } rooms = { rooms }/>
                            <Footer />
                        </div>
    );
}

export default Home;