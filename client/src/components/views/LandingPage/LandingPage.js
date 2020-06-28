import React, { useEffect } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

function LandingPage(props) {

    let isLogined = false;

    if (props.location.state !== undefined) {
        isLogined = props.location.state.isLogined;
    }

    useEffect(() => {
        axios.get('/api/hello')
            .then(response => console.log(response.data))
    }, [])

    const onLogoutClickHandler = () => {
        axios.get('api/users/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push('/login'); // 이걸 쓰려면 react-router-dom이 필요
                } else {
                    alert("logout failed");
                }
            })
    }

    const onLoginClickHandler = () => {
        props.history.push('/login');
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height : '100vh'
        }}>

            <h2> 시작 페이지 </h2>
           {isLogined == true &&       
            <button onClick={onLogoutClickHandler}>
                logout
            </button>
            }
            {isLogined == false &&       
            <button onClick={onLoginClickHandler}>
                login
            </button>
            }
        </div>

    );
}
export default withRouter(LandingPage)