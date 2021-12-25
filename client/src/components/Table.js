import Button from "./Button";
import { useState } from 'react'

const Table = ( ) => {
    const inactiveTBtn = useState("tableBtn btnInactive");
    const clickableTBtn = useState("tableBtn btnClickable");
    const chosenTBtn = useState("tableBtn btnChosen");

    const onClick = (e) => {
        e.preventDefault();
        console.log(e.target.classList);
        if(e.target.style.classList == clickableTBtn[0]) e.target.classList = chosenTBtn[0];
        else {
            e.target.classList = clickableTBtn[0];
        }
    }

    let currDayOfWeek = (new Date()).getDay();
    if(currDayOfWeek == 0) currDayOfWeek = 7;
    let emptyCols = 0;
    if(currDayOfWeek < 7) emptyCols = currDayOfWeek - 1;
    console.log(emptyCols);

    const getDates = () =>  {
        let curr = new Date;
        let dates = [];

        for (let i = 0; i < 7; i++) {
            let first = curr.getDate() - currDayOfWeek + 1 + i;
            let day = new Date((new Date()).setDate(first));
            dates.push(<th>{ day.getDate() + "." + ("0" + (day.getMonth() + 1)).slice(-2) }</th>);
        }

        return <tr>{ dates }</tr>;
    }

    const makeRows = () => {
        let rows = [];
        for(let i = 0; i < 13; i++){
            let cols = [];
            for(let j = 0; j < 7; j++)
                cols.push(  <td>
                                {/* <button className = { j < emptyCols ? inactiveTBtn[0] : clickableTBtn[0] } 
                                        onClick = {onClick}>
                                            { (10 + i) + ":00 - " + (11 + i) + ":00" }
                                        </button> */}
                                <Button state={ j < emptyCols ? inactiveTBtn[0] : clickableTBtn[0] } 
                                        text={ (10 + i) + ":00 - " + (11 + i) + ":00" }
                                        onClick = {onClick.bind(this)}/>
                            </td>);
            rows.push(<tr>{ cols }</tr>);
        }
        return rows;
    }
    return (
        <table>
            <tbody>
                { getDates() }
                { makeRows() }
            </tbody>
        </table>
    )
}

export default Table;