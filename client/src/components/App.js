import React, { useState, useEffect } from 'react';
import Header from './Header'
import Button from './Button'
import RoomInfo from './RoomInfo';
import Table from './Table';
import Footer from './Footer';
import { apiUrl } from './../endpoints';
import axios from 'axios';

function App() {
    const [rooms, setRooms] = useState(
        [{
            title: ""
        },
        {
            title: ""
        },{
            title: ""
        }]
    ); 

    useEffect(() => {
        axios.get(apiUrl + 'room')
        .then(response => {
            setRooms(response.data);
        });
    }, [])
    
    const regularBtn = useState("btn");
    const headerBtn = useState("btn headerBtn");
    const activeBtn = useState("btn btnActive");

    const [room1, setRoom1] = useState({class: activeBtn[0]});
    const [room2, setRoom2] = useState({class: regularBtn[0]});
    const [room3, setRoom3] = useState({class: regularBtn[0]});

    const [currRoom, setCurrRoom] = useState("1");

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

    return (
        <div className = "App">
            <Header UserLoggedIn = {false}/>
            <div className = "hero">
                <h1 className = "header">Аренда танцевальных залов в центре Москвы</h1>
                <h2>Просторные красивые залы для танцев, йоги, растяжки, мастер-классов, съемок и других мероприятий</h2>
                <p>кондиционер        вай-фай        муз.колонка с bluetooth        коврики        блоки для йоги</p>
                <Button state = { headerBtn[0] } text= "Забронировать"/>
            </div>
            <div className = "btnDiv">
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
            </div>
            <RoomInfo roomId = {currRoom}/> 
            <Table />
            <Button state = {headerBtn[0]} text = "Забронировать"/>
            <Footer />
        </div>
    );
}

export default App;
