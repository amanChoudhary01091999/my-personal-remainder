import { takeLatest, put, call, takeLeading } from "redux-saga/effects";
import { userForgotPassword, userLoginApi, userSignupApi } from "./api";
import * as constants from './constants'
import { showMessage } from "../../../misc";


function* userSignup({ payload }) {
    try {
        const response = yield userSignupApi(payload.data)
        if (response) {
            console.log("response", response)
            yield put({ type: constants.SIGNUP_REQUEST_SUCCESS, payload: { data: response.data } });
            if (payload.navigate) {
                payload.navigate()
            }
            localStorage.setItem('Authorization', response.token)
            localStorage.setItem('user', response.user._id)
        }
    } catch (error) {
        console.log('error', error)
    }
}

function* userLogin({ payload }) {
    try {
        const response = yield userLoginApi(payload.data)
        if (response) {
            console.log("response", response)
            yield put({ type: constants.LOGIN_REQUEST_SUCCESS, payload: { data: response } });
            showMessage('Login Successful', 'success')
            if (payload.navigate) {
                payload.navigate()
            }
            localStorage.setItem('Authorization', response.token)
            localStorage.setItem('user', response.user[0]._id)
        }
    } catch (error) {
        console.log('error', error)
    }
}

function* passwordReset({ payload }) {
    try {
        const response = yield userForgotPassword(payload.data)
        if (response) {
            yield put({ type: constants.PASWORD_RESET_SUCCESS, payload: { data: response } });
        }
    } catch (error) {
        console.log('error', error)
    }
}



export default function* UserSignupLogin() {
    yield takeLeading(constants.SIGNUP_REQUEST, userSignup);
    yield takeLeading(constants.LOGIN_REQUEST, userLogin);
    yield takeLeading(constants.PASWORD_RESET_REQUEST, passwordReset);

}