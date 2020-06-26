// reducer는 (previousState, action)을 가지고 nextState를 만든다.
import {
    LOGIN_USER, REGISTER_USER, AUTH_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess : action.payload} // spread operator 그냥 state의 빈 상태를 가져옴
        // redux store 안에 들어오게 된다.
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case REGISTER_USER:
            return {... state, register : action.payload}
            break;
        default:
            return state;
          //  break;
    }
}