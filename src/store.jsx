import createSaga from "redux-saga";
import { spawn } from "redux-saga/effects";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { loginSignupReducer } from "./reducers/loginSignupReducer";
import UserSignupLogin from "./components/login/state/sagas";
import TodosDaga from "./components/dashboard/state/sagas";


const createSagaMiddleware = createSaga();
const combineReducer = combineReducers({
    loginSignupReducer,
})


function* rootSaga() {
    yield spawn(UserSignupLogin)
    yield spawn(TodosDaga)
}


const store = createStore(
    combineReducer,
    applyMiddleware(createSagaMiddleware)
);
createSagaMiddleware.run(rootSaga);

export default store;