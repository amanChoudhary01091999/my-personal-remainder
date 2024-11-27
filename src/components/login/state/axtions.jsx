import * as constants from './constants'


export function userSignupRequest(payload) {
    console.log("payload in action", payload)
    return {
        type: constants.SIGNUP_REQUEST,
        payload
    }
}


export function userLoginRquest(payload) {
    console.log("payload in action", payload)
    return {
        type: constants.LOGIN_REQUEST,
        payload
    }
}


export function userForgotPasswordRquest(payload) {
    console.log("payload in action", payload)
    return {
        type: constants.PASWORD_RESET_REQUEST,
        payload
    }
}



// export function userSignupRequest(payload) {
//     return {
//         type: constants.SIGNUP_REQUEST,
//         payload
//     }
// }
