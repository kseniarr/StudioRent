import Header from "../components/Header";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { apiUrl } from "../endpoints";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [repeatPwd, setRepeatPwd] = useState('');

    const [globalError, setGlobalError] = useState('');
    
    const navigate = useNavigate();

    const userData = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const dataEntries = Object.fromEntries(data.entries());
        if(dataEntries !== null) {
            const userDto = {
                FirstName: dataEntries.FirstName,
                LastName: dataEntries.LastName,
                Password: dataEntries.Password,
                Email: dataEntries.Email 
            }
            const res = await axios.post(apiUrl + 'user/signup', userDto)
            .then(response => {
                if(response.status === 200){
                    userData.setEmail(userData.email = userDto.Email);
                    userData.setFirstName(userData.firstName = userDto.FirstName);
                    userData.setLastName(userData.lastName = userDto.LastName);
                    console.log(userData);
                    navigate("/mybookings");
                    return response.data;
                }
            })
            .catch(err => {
                err.response.data === undefined ? setGlobalError(err) : setGlobalError(err.response.data);
                setEmail('');
                setPwd('');
                setRepeatPwd('');
                setFirstName('');
                setLastName('');
            });
        }
    }

    return <>
        <Header UserLoggedIn = { userData.email !== '' }/>
        <div className = "form signup">
            <form  onSubmit = { handleSubmit }>
                <h1 className = "center">Регистрация</h1>
                <p className = "error">{ globalError }</p>
                <div className = "name">
                    <FormInput name = "FirstName" label = "Имя" type="text" style = "firstName"
                            value = { firstName } onChange = { (e) => setFirstName(e.target.value) }
                            required = { true }/>
                    <FormInput name = "LastName" label = "Фамилия" type="text" style = "lastName"
                            value = { lastName } onChange = { (e) => setLastName(e.target.value) }
                            required = { true }/>
                </div>
                <FormInput name = "Email" label = "Почта" type="email" 
                        value = { email } onChange = { (e) => setEmail(e.target.value) }
                        required = { true }/>
                <FormInput name = "Password" label = "Пароль" type="password" 
                        value = { pwd } onChange = { (e) => setPwd(e.target.value) }
                        required = { true }
                        pattern = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                <FormInput name = "RepeatUserPwd" label = "Повторите пароль" type="password" 
                        value = { repeatPwd } onChange = { (e) => setRepeatPwd(e.target.value) }
                        required = { true }
                        pattern = { pwd }/>
                <Button state = "btn headerBtn" text = "Создать аккаунт" onSubmit = { handleSubmit }/>
                <Link to = "/login"><p className = "center link">Войти</p></Link>
            </form>
        </div>
    </>
}

export default Signup;