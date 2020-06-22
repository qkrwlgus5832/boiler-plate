import { combineReducers } from 'redux';
import user from './user_reducer';
//import comment from './comment_reducer';

const rootReducer = combineReducers({
    user
    //comment
}) // reducer들을 묶어준다.

export default rootReducer;