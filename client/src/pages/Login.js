import Header from "../components/Header";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { apiUrl } from "../endpoints";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App";

const Login = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const [globalError, setGlobalError] = useState('');

    const navigate = useNavigate();

    const userData = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const loginDto = Object.fromEntries(data.entries());
        if(loginDto !== null) {
            const res = await axios.post(apiUrl + 'user/login', loginDto)
            .then(response => {
                if(response.status === 200){
                    console.log("!!!" + response.status);
                    userData.setEmail(userData.email = response.data.email);
                    userData.setFirstName(userData.firstName = response.data.firstName);
                    userData.setLastName(userData.lastName = response.data.lastName);
                    navigate("/mybookings");
                    return response.data;
                }
            })
            .catch(err => {
                if(err !== null){
                    console.log(err.response.data);
                    setGlobalError(err.response.data);
                    setEmail('');
                    setPwd('');
                }
            });
        }
    }

    return <>
        <Header UserLoggedIn = { userData.email !== '' }/>
        <div className = "form">
            <form  onSubmit = { handleSubmit }>
                <h1 className = "center">Войти</h1>
                <p className="error">{ globalError }</p>
                <FormInput name = "UserEmail" label = "Почта" type="email" 
                        value = { email } onChange = { (e) => setEmail(e.target.value) }
                        required = { true }/>
                <FormInput name = "UserPwd" label = "Пароль" type="password" 
                        value = { pwd } onChange = { (e) => setPwd(e.target.value) }
                        required = { true }
                        pattern = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                <Button state = "btn headerBtn" text = "Войти" onSubmit = { handleSubmit }/>
                <Link to = "/signup"><p className = "center link">Зарегистрироваться</p></Link>
            </form>
        </div>
    </>;
}

export default Login;