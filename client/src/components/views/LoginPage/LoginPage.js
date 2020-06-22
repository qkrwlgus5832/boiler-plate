import React, { useState } from 'react';
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHander = (event) => { // email state을 바꿔줌
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => { // password state을 바꿔줌
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // 이게 없으면 페이지가 refresh됨  
                                 // page가 refresh되면 아무것도 할 수가 없음
        let body = {
            email: Email,
            password : Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/') // 리액트에서 페이지를 이동시킬 때는 이렇게 한다.
                } else {
                    alert("Error");
                }
            })
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>

            <form style={{
                display: 'flex', flexDirection: 'column'
            }} onSubmit={ onSubmitHandler }>
                <label> Email </label>
                <input type="email" value={Email} onChange={onEmailHander} />
                <label> Password </label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>

    );
}
export default LoginPage 