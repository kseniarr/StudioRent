import { useContext, useState } from "react";
import Header from "../components/Header";
import { UserContext } from "../App";
import axios from "axios";
import { apiUrl } from "../endpoints";
import { useEffect } from "react/cjs/react.development";
import Button from "../components/Button";

const MyBookings = () => {
    const userData = useContext(UserContext);
    const [bookingsData, setBookingsData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const regularBtn = "btn";
    
    const deleteRow = async (bookingId) => {
        const res = await axios.delete(apiUrl + 'booking', {params: {bookingId: bookingId}})
            console.log(res);
            setRefresh(true);
    }

    useEffect(() => {
        axios.get(apiUrl + "booking/getuserbookings", { params: {email: userData.email}})
            .then(res => {
                console.log(res);
                    setBookingsData(res.data);
                    setRefresh(false);
            });
    }, [refresh])

    const displayTable = () => {
        if(bookingsData !== null){
            let rows = [];
            for(let i = bookingsData.length - 1; i > 0; i--) {
                let cols = [];
                let day = (new Date(bookingsData[i].date)).getDate();
                let month = (new Date(bookingsData[i].date)).getMonth();
                cols.push(<td className="bookingsTd">{ bookingsData[i].title }</td>);
                cols.push(<td className="bookingsTd">{ bookingsData[i].hourFrom } :00 - { bookingsData[i].hourTo }:00</td>);
                cols.push(<td className="bookingsTd">{ (day < 10 ? ("0" + day) : day) + "." + ((month + 1) < 10 ? ("0" + (month + 1)) : (month + 1))  }</td>);
                cols.push(<td className="bookingsTd">{ bookingsData[i].price}</td>);
                cols.push(<td><Button state = { regularBtn + " bookingsBtn"} text = "Удалить" onClick = { () => deleteRow(bookingsData[i].bookingId) } /></td>)
                rows.push(<tr>{cols}</tr>);
            }
            return rows;
        }
    }

    return <div>
        <Header UserLoggedIn = { userData.email !== '' }/>
        <h1 className="center">Мои брони</h1>
        { console.log(bookingsData) }
        <table>
            <tbody>
                <tr>
                    <th className="bookingsTh">Зал</th>
                    <th className="bookingsTh">Время</th>
                    <th className="bookingsTh">Дата</th>
                    <th className="bookingsTh">Цена</th>
                    <th className="bookingsTh">  </th>
                </tr>
                { displayTable() }
            </tbody>
        </table>);
    </div>;
}

export default MyBookings;