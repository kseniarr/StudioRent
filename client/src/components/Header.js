import { Link } from 'react-router-dom'

const Header = ({ UserLoggedIn } ) => {
    return (
        <header>
            <Link to = "/" ><p className = 'companyName'>Studio<span>Rent</span></p></Link>
            <div className = "rightHeaderDiv">
                <Link to = { UserLoggedIn ? "/mybookings" : "/login"}><h3>{ UserLoggedIn ? "Мои брони" : "Войти" }</h3></Link>
                <Link to = "/logout" className = { UserLoggedIn ? "logoutShow" : "logoutHide" }><h3>Выйти</h3></Link>
            </div>
        </header>
    )
}

Header.defaultProps = {
    UserLoggedIn: false,
}

export default Header