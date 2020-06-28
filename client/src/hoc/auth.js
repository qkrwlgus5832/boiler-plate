import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';
import axios from 'axios'

function isLoginedCheck(){
	axios.get('api/users/auth', (response) => {
			if (response.data.isAuth)
				return true;
			else
				return false;
		}
	)
}
export default function (SpecificComponent, option, adminRoute = null) {
	// option�� null��, true�� ,false���� ���� �� ����

	// null�� �ƹ��� ������ ������ ������
	// true�� �α����� ������ ������ ������ ������ 
	// false�� �α����� ������ ������ �Ұ����� ������ 

	function AuthenticationCheck(props) { // �������� �̵��� �� ���� dispatch�� �Ͼ��.
		const dispatch = useDispatch();
		useEffect(() => {
			dispatch(auth()).then(response => {
				const state = {
					isLogined : false
				}
				// �α������� ���� ����
				if (!response.payload.isAuth) {
					if (option){
						props.history.push('/login', state);
					}
				} else{
					state.isLogined= true;
					if (adminRoute && !response.payload.isAdmin){
						props.history.push('/', state);
					}
					if (!option)
						props.history.push('/', state);
				}
				
			})
		}, [])
		return (
			<SpecificComponent isLogined={false}/>
		 );
	}
	return AuthenticationCheck
}