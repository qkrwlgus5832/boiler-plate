import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHander = (event) => { // email state?�쏙???�쌕?�옙?�쏙??
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => { // email state?�쏙???�쌕?�옙?�쏙??
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => { // password state?�쏙???�쌕?�옙?�쏙??
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => { // password state?�쏙???�쌕?�옙?�쏙??
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // ?�싱곤옙 ?�쏙?�占?�옙?�쏙???�쏙?�占?�옙?�쏙?�占?�옙 refresh?�쏙?? 
        // page?�쏙??refresh?�실몌옙 ?�싣뱄옙?�싶?�옙 ?�쏙???�쏙?�占?�옙 ?�쏙?�占?�옙

        if (Password != ConfirmPassword) {
            return alert("비밀번호와 확인비밀번호는 같아야 합니다."); // ?�쏙???�쏙?�占?�옙?�쏙???�쏙?�占?�옙?�쏙???�쏙?�占?�댐??
        }
        let body = {
            email: Email,
            name : Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login') // ?�쏙?�占?�옙?�占?�옙?�쏙???�쏙?�占?�옙?�쏙?�占?�옙 ?�싱?�옙?�쏙?�킬 ?�쏙?�占?�옙 ?�싱뤄옙?�쏙???�싼?�옙.
                } else {
                    alert("회원가입에 실패하였습니다.");
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
            }} onSubmit={onSubmitHandler}>
                <label> Email </label>
                <input type="email" value={Email} onChange={onEmailHander} />

                <label> Name </label>
                <input type="text" value={Name} onChange={onNameHandler} /> 


                <label> Password </label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label> Confirm Password </label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button type="submit">
                    register
                </button>
            </form>
        </div>

    );
}
export default withRouter(RegisterPage)