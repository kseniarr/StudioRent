import { userState, useState } from 'react'

const onClickFunc = () => {
    console.log("click")
}

const Button = ({ state, text, onClick} ) => {
    return (
        <button className = { state } onClick = {onClick}>{ text }</button>
    )
}

Button.defaultProps = {
    onClick: onClickFunc
}

export default Button