import Button from "./Button";
import { useEffect, useState, useContext, useMemo, useRef } from 'react'
import { apiUrl } from "../endpoints";
import axios from "axios";
import { UserContext } from '../App';

const Table = ( { roomId, rooms } ) => {
    const inactiveTBtn = "tableBtn btnInactive";
    const clickableTBtn = "tableBtn btnClickable";
    const chosenTBtn = "tableBtn btnChosen";
    const headerBtn = "btn headerBtn";

    const [btnsArr, setBtnsArr] = useState(null);
    const [bookings, setBookings] = useState(null);

    const [userChoice, setUserChoice] = useState([]);
    const [indivChecked, setIndivChecked] = useState(false);

    const priceRef = useRef(0);
    const hourFromRef = useRef(0);
    const hourToRef = useRef(0);

    const userData = useContext(UserContext);

    const [dates, setDates] = useState([]);

    let currDayOfWeek = (new Date()).getDay();
    let emptyCols = 0;
    if(currDayOfWeek == 0) {
        currDayOfWeek = 7;
        emptyCols = 6;
    }
    if(currDayOfWeek < 7) emptyCols = currDayOfWeek - 1;
    

    // GENERATES TABLE HEADER (DATES OF CURRENT WEEK)

    const getDates = () =>  {
        let curr = new Date;
        let tempDates = [];

        for (let i = 0; i < 7; i++) {
            let first = curr.getDate() - currDayOfWeek + 1 + i;
            let day = new Date((new Date()).setDate(first));
            
            tempDates.push((day.getDate() < 10 ? ("0" + day.getDate()) : day.getDate()) + "." + ("0" + (day.getMonth() + 1)).slice(-2));
        }
        setDates(tempDates);
        return tempDates;
    }  
 
    const memoizedValue = useMemo(() => getDates(), []);
    
    const datesToHeader = () => {
        let headers = [];
        if(dates !== [])
            for(let i = 0; i < 7; i++){
                headers.push(<th key = {"thDate" + i}>{memoizedValue[i]}</th>);
            }
        return headers;
    }


    // FETCHES BOOKINGS FOR THE CURRENT WEEK 

    useEffect( () => {
            axios.get(apiUrl + `booking/getroombookings?roomId=${roomId}` )
                .then(response => {
                    setBookings(response.data);
                    setBtnsArr(null);
                    return response.data;
                })
                .catch(err => console.log(err));
    }, [roomId])
    
    // SETS INACTIVE COLUMNS FOR PREVIOUS DAYS

    useEffect( () => {
        const setBtnStates = () => {
            let rows = [];
            
            for(let i = 0; i < 13; i++) {
                let cols = [];
                for(let j = 0; j < 7; j++){
                    let btnState = j < emptyCols ? inactiveTBtn : clickableTBtn;
                    if((j == emptyCols) && ((new Date()).getHours() >= i + 10)) {
                        btnState = inactiveTBtn;
                    }
                    cols.push(btnState);
                }
                rows.push(cols);
            }
            setBtnsArr(old => old = [...rows]);
        }
        
        setBtnStates();
    }, [bookings, emptyCols])


    // SETS BOOKINGS FOR REST OF THE WEEK

    useEffect( () => {
        const setWeekBookings = () => {
            if(btnsArr !== null){
                let tmpBtns = [...btnsArr];

                for(let i = 0; i < 13; i++){
                    for(let j = currDayOfWeek; j < 7; j++){
                        tmpBtns[i][j] = clickableTBtn;
                    }
                }
                    
                if(bookings !== [] && bookings !== null){
                    for(let i = 0; i < bookings.length; i++){
                        let weekNum = (new Date(bookings[i].date)).getDay(); 
                        if(weekNum == 0) weekNum = 7;

                        const rowStart = (bookings[i].hourFrom - 10) % 13;
                        const numRows = bookings[i].hourTo - bookings[i].hourFrom;
                        for(let j = rowStart; j < rowStart + numRows; j++){
                            tmpBtns[j][weekNum - 1] = inactiveTBtn;
                        }
                    }
                    setBtnsArr(old => tmpBtns);
                }
            }
        }

        setWeekBookings();
    }, [bookings, currDayOfWeek])
    
    const onClick = ({ row, col }) => {
        return  () => {
            let btnsArrCopy = [...btnsArr];

            if(btnsArrCopy[row][col] !== inactiveTBtn){
                if(userChoice.length > 0 && userChoice[0].row == row && userChoice[0].col == col){
                    btnsArrCopy[userChoice[0].row][userChoice[0].col] = clickableTBtn;
                        setUserChoice([]);
                        hourFromRef.current = 0;
                        hourToRef.current = 0;
                }
                else{
                    if(userChoice.length > 0) {
                        btnsArrCopy[userChoice[0].row][userChoice[0].col] = clickableTBtn;
                    }
                    btnsArrCopy[row][col] = chosenTBtn;
                    setUserChoice([{row, col}]);
                    hourFromRef.current = row + 10;
                    hourToRef.current = row + 11;
                }
                               
                calculatePrice();
            }
        }
    }

    const calculatePrice = () => {
        let tmpPrice = 0;
                for(let i = hourFromRef.current; i < hourToRef.current; i++){
                    if(indivChecked) tmpPrice += rooms[roomId].indivPrice;
                    else if (i <= 4) tmpPrice += rooms[roomId].morningPrice;
                    else tmpPrice += rooms[roomId].eveningPrice;
                }
                priceRef.current = tmpPrice;
    }

    const makeRows = () => {
        if(btnsArr !== null){
            let rows = [];
            for(let i = 0; i < 13; i++){
                let cols = [];
                for(let j = 0; j < 7; j++){
                    cols.push(  <td key = {"trRows-" + i + "-" + j}>
                                    <Button state={ btnsArr[i][j] } 
                                            text={ (10 + i) + ":00 - " + (11 + i) + ":00" }
                                            onClick = {onClick({row: i, col: j})}
                                            key = {{row: i, col: j}} />
                                </td>);
                }
                rows.push(<tr key = {"trCols-" + i}>{ cols }</tr>);
            }
            return rows;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userData.email !== "" && priceRef.current !== 0){
            const dateParts = memoizedValue[(userChoice[0].col)].toString().split(".");
            const bookingDto = {
                Email: userData.email,
                IdRoom: roomId,
                HourFrom: hourFromRef.current,
                hourTo: hourToRef.current, 
                Date: (new Date()).getFullYear() + "-" + dateParts[1] + "-" + dateParts[0] + "T00:00:00",
                Price: priceRef.current
            }

            const res = await axios.post(apiUrl + 'booking', bookingDto)
                .then(response => {
                    if(response.status === 200){
                        setBookings([...response.data]);
                        
                        let btnsArrCopy = [...btnsArr];
                        btnsArrCopy[userChoice[0].row][userChoice[0].col] = chosenTBtn;
                        setBtnsArr(old => btnsArrCopy);

                        return response.data;
                    }
                });
        }
    }

    return (
        <>
            <table>
                <tbody>
                    <tr key = "trDates">{datesToHeader()}</tr>
                    { makeRows() }
                </tbody>
            </table>
            <form className="radioForm">
                    <div>
                        <input type="checkbox" value="1-3 челоевка" checkhed = { indivChecked.toString() } 
                        onChange = { () => { setIndivChecked(old => !indivChecked); calculatePrice(); } }/> 1-3 человека
                    </div>
                    <p className = "additionalInfo"><span className = "purpleTitle">Стоимость:</span>  
                            { calculatePrice() } { priceRef.current }  рублей</p>
                    <Button state = { headerBtn } text = "Забронировать" onClick = { handleSubmit }/>
                    <p className = { userData.email === "" ? "error" : "hidden" } >Забронировать можно только после регистрации!</p>
            </form>
        </>
    )
}

export default Table;