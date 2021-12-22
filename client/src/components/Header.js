import PropTypes from 'prop-types'

const Header = ({ UserLoggedIn } ) => {
    return (
        <header>
            <p className='companyName'>Studio<span>Rent</span></p>
            <h3>{UserLoggedIn ? "Мои брони" : "Войти"}</h3>
        </header>
    )
}

Header.defaultProps = {
    UserLoggedIn: false,
}


export default Header