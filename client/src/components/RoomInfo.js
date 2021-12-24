import Button from './Button';
import Table from './Table'
import { useState } from 'react' 

const RoomInfo = ({ roomId } ) => {
    return (
        <div className = "roomDiv center">
            <div className = "imgDiv">
                <img src={ require("../images/black/1.jpg") }></img>
                <img src={ require("../images/black/2.jpg") }></img>
                <img src={ require("../images/black/3.jpg") }></img>
            </div>
            <h1>Черный зал</h1>
            <p>Идеально подходит для групповых занятий, репетиций, курсов</p>
            <div className = "info center">
                <p className = "additionalInfo"><span className = "purpleTitle">Размер:</span> 50 кв.м</p>
                <p className = "additionalInfo"><span className = "purpleTitle">Вместимость:</span> до 30 человек</p>
                <p className = "additionalInfo"><span className = "purpleTitle">Покрытие:</span> ламинат</p>
            </div>
        </div>
    )
}

export default RoomInfo;