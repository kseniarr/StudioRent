
const Button = ({ text, type, onClick } ) => {
    return (
        <button onClick = { onClick } className = { "btn "+ type }>{ text }</button>
    )
}

Button.defaultProps = {
    type: "btn"
}

export default Button