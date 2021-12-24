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
    
    let chosenRoomId = "1";

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
                />
                <Button state = {whiteRoom} 
                        text = "Белый зал" 
                />
                <Button state = {smallRoom} 
                        text = "Малый зал" 
                />
            </div>
            <RoomInfo roomId = {chosenRoomId}/> 
            <Table />
            <Button state = {headerBtn[0]} text = "Забронировать"/>
            <Footer />
        </div>
    );
}

export default App;
