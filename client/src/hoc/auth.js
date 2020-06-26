import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
	// option에 null값, true값 ,false값이 들어올 수 있음

	// null은 아무나 출입이 가능한 페이지
	// true는 로그인한 유저만 출입이 가능한 페이지 
	// false는 로그인한 유저는 출입이 불가능한 페이지 

	function AuthenticationCheck(props) { // 페이지가 이동할 때 마다 dispatch가 일어난다.
		const dispatch = useDispatch();
		useEffect(() => {
			dispatch(auth()).then(response => {
				// 로그인하지 않은 상태
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