import Button from "./Button";
import { useEffect, useState } from 'react'
import { apiUrl } from "../endpoints";
import axios from "axios";

const Table = ( { roomId } ) => {
    const inactiveTBtn = useState("tableBtn btnInactive");
    const clickableTBtn = useState("tableBtn btnClickable");
    const chosenTBtn = useState("tableBtn btnChosen");

    const [btnsArr, setBtnsArr] = useState(null);
    const [bookings, setBookings] = useState(null);

    let currDayOfWeek = (new Date()).getDay();
    let emptyCols = 0;
    if(currDayOfWeek == 0) {
        currDayOfWeek = 7;
        emptyCols = 6;
    }
    
    if(currDayOfWeek < 7) emptyCols = currDayOfWeek - 1;

    const getDates = () =>  {
        let curr = new Date;
        let tempDates = [];

        for (let i = 0; i < 7; i++) {
            let first = curr.getDate() - currDayOfWeek + 1 + i;
            let day = new Date((new Date()).setDate(first));
            tempDates.push(<th>{ day.getDate() + "." + ("0" + (day.getMonth() + 1)).slice(-2) }</th>);
        }

        return tempDates;
    }  

    useEffect( () => {
        axios.get(apiUrl + 'booking/getroombookings', { params: { roomId: roomId } } )
            .then(response => {
                setBookings(response.data);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect( () => {
        const setBtnStates = () => {
            let rows = [];
            
            for(let i = 0; i < 13; i++) {
                let cols = [];
                for(let j = 0; j < 7; j++){
                    const btnState = j < emptyCols ? inactiveTBtn[0] : clickableTBtn[0];
                    cols.push(btnState);
                }
                rows.push(cols);
            }
            setBtnsArr(rows);
        }
        setBtnStates();
    }, []);

    useEffect(() => {
        if(bookings !== null && btnsArr !== null){
            let tmpBtns = [...btnsArr];

            for(let i = 0; i < bookings.length; i++){
                let weekNum = (new Date(bookings[i].date)).getDay(); 
                if(weekNum == 0) weekNum = 7;

                const col = weekNum - 1;
                const rowStart = (bookings[i].hourFrom - 10) % 13;
                const rowEnd = bookings[i].hourTo - bookings[i].hourFrom;

                for(let j = rowStart; j <= rowEnd; j++)
                    tmpBtns[j][col] = inactiveTBtn[0];
            }

            setBtnsArr(tmpBtns);
        }
    }, [bookings])

    const onClick = ({ row, col }) => {
        return () => {
            let btnsArrCopy = [...btnsArr];

            if(btnsArr[row][col] !== inactiveTBtn[0]){
                
                if(btnsArr[row][col] == clickableTBtn[0]){
                    btnsArrCopy[row][col] = chosenTBtn[0];
                }
                else {
                    btnsArrCopy[row][col] = clickableTBtn[0];
                }
                
                setBtnsArr(btnsArrCopy);
            }
        }
    }

    const makeRows = () => {
        if(btnsArr !== null){
            let rows = [];
            for(let i = 0; i < 13; i++){
                let cols = [];
                for(let j = 0; j < 7; j++){
                    cols.push(  <td>
                                    <Button state={ btnsArr[i][j] } 
                                            text={ (10 + i) + ":00 - " + (11 + i) + ":00" }
                                            onClick = {onClick({row: i, col: j})}
                                            key = {{row: i, col: j}} />
                                </td>);
                }
                rows.push(<tr>{ cols }</tr>);
            }
            return rows;
        }
    }

    return (
        <table>
            <tbody>
                <tr>{getDates()}</tr>
                { makeRows() }
            </tbody>
        </table>
    )
}

export default Table;