import React from "react";
import { Navigate, Route } from "react-router-dom";
import store from "./store";
import { showMessagePopup } from "./components/messageComponent/state/action";

function getLocalValue() {
    return localStorage.getItem("Authorization");
}

export function getuserId() {
    return localStorage.getItem("user");
}



export const PrivateRoutes = ({ children }) => {
    if (getLocalValue() === null) {
        return <Navigate to="/login" replace={true} />
    }
    return children;
};


export function showMessage(body, type, errorCode = 501) {

    console.log({ body })
    store.dispatch(
        showMessagePopup({
            body,
            type,
            errorCode
        })
    )
}