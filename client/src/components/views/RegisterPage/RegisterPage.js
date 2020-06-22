import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHander = (event) => { // email state을 바꿔줌
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => { // email state을 바꿔줌
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => { // password state을 바꿔줌
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => { // password state을 바꿔줌
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // 이게 없으면 페이지가 refresh됨  
        // page가 refresh되면 아무것도 할 수가 없음

        if (Password != ConfirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다."); // 이 밑으로 진입을 못한다!
        }
        let body = {
            email: Email,
            name : Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login') // 리액트에서 페이지를 이동시킬 때는 이렇게 한다.
                } else {
                    alert("회원 가입에 실패하였습니다");
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
export default RegisterPage