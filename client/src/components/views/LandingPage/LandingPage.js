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

    const onClickHandler = () => {
        axios.get('api/users/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push('/login'); // 이걸 쓰려면 react-router-dom이 필요
                } else {
                    alert("logout failed");
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height : '100vh'
        }}>

            <h2> 시작 페이지 </h2>
           {isLogined == true &&       
            <button onClick={onClickHandler}>
                logout
            </button>
            }
        </div>

    );
}
export default withRouter(LandingPage)