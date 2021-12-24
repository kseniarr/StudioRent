import React from 'react';
import Header from './Header'
import Button from './Button'
import RoomInfo from './RoomInfo';
import Table from './Table';
import Footer from './Footer';
import { useState } from 'react'

function App() {
    const regularBtn = useState("btn");
    const headerBtn = useState("btn headerBtn");
    const activeBtn = useState("btn btnActive");

    const [blackRoom, setBlackRoom] = useState(activeBtn[0])
    const [whiteRoom, setWhiteRoom] = useState(regularBtn[0])
    const [smallRoom, setSmallRoom] = useState(regularBtn[0])

    const [currRoom, setCurrRoom] = useState("1");

    const chooseRoom = (id) => 
    {
        return function () {
            setCurrRoom(id);
            if (id == "1") {
                setBlackRoom(activeBtn[0]);
                setWhiteRoom(regularBtn[0]);
                setSmallRoom(regularBtn[0]);
            }
            else if (id == "2"){
                setBlackRoom(regularBtn[0]);
                setWhiteRoom(activeBtn[0]);
                setSmallRoom(regularBtn[0]);
            }
            else{
                setBlackRoom(regularBtn[0]);
                setWhiteRoom(regularBtn[0]);
                setSmallRoom(activeBtn[0]);
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
                <Button state = {blackRoom} 
                        text = "Черный зал" 
                        onClick = { chooseRoom("1") }
                />
                <Button state = {whiteRoom} 
                        text = "Белый зал" 
                        onClick = { chooseRoom("2") }
                />
                <Button state = {smallRoom} 
                        text = "Малый зал" 
                        onClick = { chooseRoom("3") }
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
