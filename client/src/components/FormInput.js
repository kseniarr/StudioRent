import { useState } from "react";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    }

    const [emailError, setEmailError] = useState("Введите корректную почту!");
    const [pwdError, setPwdError] = useState("Пароль должен состоять минимум из 8 символов, содержать хотя бы 1 букву и цифру!");
    const [repeatPwdError, setRepeatPwdError] = useState("Пароли должны совпадать!");

    return <div className = {"formInput " + props.style}>
        <label>{ props.label }</label>
        <input name = { props.name } type = { props.type } value = { props.value } 
                onChange = { props.onChange } onBlur = { handleFocus } focus = { focused.toString() }
                onFocus = { () => props.name === "confirmPwd" && setFocused(true)}
                required = { props.required } pattern = { props.pattern }/>
        <p className = "errorMessage"> { props.value !== '' 
                                        ? (props.name === "UserEmail" || props.name === "Email" ? emailError : (
                                            props.name === "Password") ? pwdError :  (
                                                props.name === "RepeatUserPwd" ? repeatPwdError : null
                                            )
                                        ) : (focused === true) ? setFocused(false) : null }</p>
    </div>
}

FormInput.defaultProps = {
    errorMessage: ""
}

export default FormInput;