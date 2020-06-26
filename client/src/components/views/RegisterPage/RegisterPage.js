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

    const onEmailHander = (event) => { // email state�� �ٲ���
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => { // email state�� �ٲ���
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => { // password state�� �ٲ���
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => { // password state�� �ٲ���
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault(); // �̰� ������ �������� refresh��  
        // page�� refresh�Ǹ� �ƹ��͵� �� ���� ����

        if (Password != ConfirmPassword) {
            return alert("��й�ȣ�� ��й�ȣ Ȯ���� ���ƾ� �մϴ�."); // �� ������ ������ ���Ѵ�!
        }
        let body = {
            email: Email,
            name : Name,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login') // ����Ʈ���� �������� �̵���ų ���� �̷��� �Ѵ�.
                } else {
                    alert("ȸ�� ���Կ� �����Ͽ����ϴ�");
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