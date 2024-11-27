import request from "../../../request"




export const userSignupApi = (payload) => {

    const options = {
        postData: {
            url: `user/signup`,
            method: 'post',
            data: payload
            // headers: { "Authorization": getAuthToken() }


        }
        // , loader: { isLoader: true }
    }


    return request(options)
}



export const userLoginApi = (payload) => {

    const options = {
        postData: {
            url: `user/login`,
            method: 'post',
            data: payload
            // headers: { "Authorization": getAuthToken() }


        }
        // , loader: { isLoader: true }
    }


    return request(options)
}


export const userForgotPassword = (payload) => {

    const options = {
        postData: {
            url: `password/forgot_password`,
            method: 'post',
            data: payload
            // headers: { "Authorization": getAuthToken() }


        }
        // , loader: { isLoader: true }
    }


    return request(options)
}


export const validateAuthApi = (payload) => {

    const options = {
        postData: {
            url: `password/validateToken`,
            method: 'post',
            data: payload
            // headers: { "Authorization": getAuthToken() }


        }
        // , loader: { isLoader: true }
    }


    return request(options)
}



export const resetPasswoedApi = (payload) => {

    const options = {
        postData: {
            url: `password/reset_password`,
            method: 'post',
            data: payload
            // headers: { "Authorization": getAuthToken() }


        }
        // , loader: { isLoader: true }
    }


    return request(options)
}