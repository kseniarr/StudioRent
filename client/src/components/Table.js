import Button from "./Button";
import { useState } from 'react'

const Table = ( ) => {
    const inactiveTBtn = useState("tableBtn btnInactive");
    const clickableTBtn = useState("tableBtn btnClickable");
    const chosenTBtn = useState("tableBtn btnChosen");

    let currDayOfWeek = (new Date()).getDay();
    if(currDayOfWeek == 0) currDayOfWeek = 7;
    let emptyCols = 0;
    if(currDayOfWeek < 7) emptyCols = currDayOfWeek - 1;

    const getDates = () =>  {
        let curr = new Date;
        let dates = [];

        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i;
            let day = new Date(curr.setDate(first));
            dates.push(<th>{ day.getUTCDate() + "." + ("0" + (day.getMonth() + 1)).slice(-2) }</th>);
        }

        return <tr>{ dates }</tr>;
    }

    const makeRows = () => {
        let rows = [];
        for(let i = 0; i < 13; i++){
            let cols = [];
            for(let j = 0; j < 7; j++)
                cols.push(  <td>
                                <Button state={ j < emptyCols ? inactiveTBtn[0] : clickableTBtn[0] } 
                                        text={ (10 + i) + ":00 - " + (11 + i) + ":00" }/>
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