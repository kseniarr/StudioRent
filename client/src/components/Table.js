import Button from "./Button";
import { useState } from 'react'

const Table = ( {stateList} ) => {
    const inactiveTBtn = useState("tableBtn btnInactive");
    const clickableTBtn = useState("tableBtn btnClickable");
    const chosenTBtn = useState("tableBtn btnChosen");

    let currDayOfWeek = (new Date()).getDay();
    let emptyCols = 0;
    if(currDayOfWeek < 7) emptyCols = currDayOfWeek - 1;

    const getDates = () =>  {
        let dates = [];
        for(let i = 0; i < 7; i++){
            let date = new Date();
            date.setDate(date.getDate() + 1);
            if(i < emptyCols){
                date.setDate(date.getDate() - parseInt(emptyCols - i));
            }
            else{
                date.setDate(date.getDate() + parseInt((i + 1)%(currDayOfWeek)));
            }
            dates.push(<th>{date.getUTCDate() + "." + date.getMonth()}</th>);
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
                                        text={(10 + i) + ":00 - " + (11 + i) + ":00"
                                }/>
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