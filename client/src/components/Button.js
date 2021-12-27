
const onClickFunc = () => {
    console.log("click")
}

const Button = ({ state, text, onClick, onSubmit} ) => {
    return (
        <button className = { state } onClick = {onClick} onSubmit = { onSubmit }>{ text }</button>
    )
}

Button.defaultProps = {
    onClick: onClickFunc,
    onSubmit: onClickFunc
}

export default Button