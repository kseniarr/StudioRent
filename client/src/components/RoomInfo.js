import Button from './Button';
import Table from './Table'
import { useState } from 'react' 

const RoomInfo = ({ info } ) => {
    console.log(info.photosLocation);
    const showImg = () => {
        switch (info.photosLocation) {
            case "../images/black/":
                return <div className = "imgDiv">
                            <img src={ require("../images/black/1.jpg") }></img>
                            <img src={ require("../images/black/2.jpg") }></img>
                            <img src={ require("../images/black/3.jpg") }></img>
                        </div>;
            case "../images/white/":
                return <div className = "imgDiv">
                            <img src={ require("../images/white/1.jpg") }></img>
                            <img src={ require("../images/white/2.jpg") }></img>
                            <img src={ require("../images/white/3.jpg") }></img>
                        </div>;
            case "../images/small/":
                return <div className = "imgDiv">
                            <img src={ require("../images/small/1.jpg") }></img>
                            <img src={ require("../images/small/2.jpg") }></img>
                            <img src={ require("../images/small/3.jpg") }></img>
                        </div>;
            default:
                break;
        }
    }
    return (
        <div className = "roomDiv center">
            { showImg() }
            <h1>{ info.title }</h1>
            <p>{ info.description }</p>
            <div className = "info center">
                <p className = "additionalInfo"><span className = "purpleTitle">Размер:</span> { info.size } кв.м</p>
                <p className = "additionalInfo"><span className = "purpleTitle">Вместимость:</span> до { info.capacity } человек</p>
                <p className = "additionalInfo"><span className = "purpleTitle">Покрытие:</span> ламинат</p>
            </div>
        </div>
    )
}

export default RoomInfo;