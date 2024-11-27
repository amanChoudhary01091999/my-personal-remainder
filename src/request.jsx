import axios from "axios";
import { getuserId, showMessage } from "./misc";

const request = async (payload) => {
    const baseUrl = 'http://localhost:3005/'
    const defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'userId': getuserId()

    };
    payload.postData.url = `${baseUrl}${payload.postData.url}`
    payload.postData.headers = { ...defaultHeaders, ...payload.postData.headers }
    console.log({ payyyy: payload.postData })
    return axios(payload.postData)
        .then((res) => {
            return res.data
        })

        .catch((e) => {
            showMessage(e.response.data.message, 'error')

            // requestLoaderHandler(payload.loader.isLoader, false)
            // toast.error(e.response.data.message, {
            //     position: toast.POSITION.TOP_CENTER,
            //     autoClose: 2000
            // });
            // if (e.response.status === 401) {
            //     handleLogout()
            // }
            return false;
        })

}

export default request