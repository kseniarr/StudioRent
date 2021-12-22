import React from 'react';
import Header from './Header'
import Button from './Button'
import RoomInfo from './RoomInfo';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
        <Header UserLoggedIn = {false}/> {/* get from api later */}
        <div className="hero">
            <h1 className="header">Аренда танцевальных залов в центре Москвы</h1>
            <h2>Просторные красивые залы для танцев, йоги, растяжки, мастер-классов, съемок и других мероприятий</h2>
            <p>кондиционер        вай-фай        муз.колонка с bluetooth        коврики        блоки для йоги</p>
            <Button type = "btnActive headerBtn" text = "Забронировать" onClick={() => console.log("click!!!!!!!!!!!")}/>
        </div>
        <div className = "btnDiv">
            <Button type = "btnActive" text = "Черный зал" onClick={() => console.log("малый зал")}/>
            <Button type = "btn" text = "Белый зал" onClick={() => console.log("белый зал")}/>
            <Button type = "btn" text = "Малый зал" onClick={() => console.log("черный зал")}/>
        </div>
        <RoomInfo roomId="1"/>
        <Footer />
    </div>
  );
}

export default App;
