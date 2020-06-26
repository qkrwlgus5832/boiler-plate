import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
	// option�� null��, true�� ,false���� ���� �� ����

	// null�� �ƹ��� ������ ������ ������
	// true�� �α����� ������ ������ ������ ������ 
	// false�� �α����� ������ ������ �Ұ����� ������ 

	function AuthenticationCheck(props) { // �������� �̵��� �� ���� dispatch�� �Ͼ��.
		const dispatch = useDispatch();
		useEffect(() => {
			dispatch(auth()).then(response => {
				// �α������� ���� ����
				if (!response.payload.isAuth) {
					if (option){
						props.history.push('/login');
					}
				} else{
					if (adminRoute && !response.payload.isAdmin){
						props.history.push('/');
					}
					if (!option)
						props.history.push('/');
				}
			})
		}, [])
		return (
			<SpecificComponent/>
		 );
	}
	return AuthenticationCheck
}