import Button from "./Button";
import ObjectRow from "./ObjectRow";

const makeRows = () => {
    var rows = [];
    for (var i = 0; i < 7; i++) {
        for(var j = 0; j < 23; j++)
            rows.push(<ObjectRow key={i} type="btnInactive" text={(parseInt(10) + j)+":00 - " + (parseInt(11) + j)+":00"} />);
    }
    return <tbody>{rows}</tbody>;
}

const Table = () => {
    return (
        <table>
            {/* <tr>
                <th>20.12</th>
                <th>21.12</th>
                <th>22.12</th>
                <th>23.12</th>
                <th>24.12</th>
                <th>25.12</th>
                <th>26.12</th>
            </tr> */}
            {makeRows()}
            {/* <tr>
            
                {/* <td><Button type="btnInactive" text="10:00 - 11:00"/></td>
                <td><Button type="btnInactive" text="11:00 - 12:00"/></td>
                <td><Button type="btnInactive" text="12:00 - 13:00"/></td>
                <td><Button type="btnInactive" text="13:00 - 14:00"/></td>
                <td><Button type="btnInactive" text="14:00 - 15:00"/></td>
                <td><Button type="btnInactive" text="15:00 - 16:00"/></td>
                <td><Button type="btnInactive" text="16:00 - 17:00"/></td>
                <td><Button type="btnInactive" text="17:00 - 18:00"/></td>
                <td><Button type="btnInactive" text="18:00 - 19:00"/></td>
                <td><Button type="btnInactive" text="19:00 - 20:00"/></td>
                <td><Button type="btnInactive" text="20:00 - 21:00"/></td>
                <td><Button type="btnInactive" text="21:00 - 22:00"/></td>
                <td><Button type="btnInactive" text="22:00 - 23:00"/></td> */}
           
            
        </table>
    )
}

export default Table;