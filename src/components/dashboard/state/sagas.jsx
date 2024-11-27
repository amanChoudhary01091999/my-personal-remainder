import { takeLatest, put, call, takeLeading } from "redux-saga/effects";

import * as constants from './constants'
import { addNewTodoApi, deletUserRemainder, editExistingTodo, getAllTodoListApi } from "./api";
import { editTodo } from "./axtions";


function* getAllTodos({ payload }) {
    try {

        const response = yield getAllTodoListApi(payload.data)
        console.log("YESS", response.data)
        if (response) {
            yield put({ type: constants.STORE_ALL_TODOS, payload: response.data })
        }
    }
    catch (error) {
        console.log('error', error)
    }
}



function* addNewTodo({ payload }) {
    try {
        let mode = payload.mode
        let response;
        if (mode === 'EDIT') {
            response = yield editExistingTodo({ ...payload.data, id: payload.editId })
        }
        else {
            response = yield addNewTodoApi(payload.data)
        }
        console.log("RESSSSS", response)
        if (response) {
            yield put({ type: constants.STORE_NEW_TODO, payload: { data: response.data, extraInfo: payload } })
            if (payload.callBackfn) {
                payload.callBackfn()
            }
        }


    }
    catch (error) {
        console.log('error', error)
    }
}


function* deleteTodo({ payload }) {
    try {

        const response = yield deletUserRemainder({ id: payload.id })
        if (response) {
            yield put({ type: constants.STORE_NEW_TODO, payload: { extraInfo: payload } })
        }

    }
    catch (error) {
        console.log('error', error)
    }
}





export default function* TodosDaga() {
    yield takeLeading(constants.GET_ALL_TODOS, getAllTodos);
    yield takeLeading(constants.ADD_NEW_TODO, addNewTodo)
    yield takeLeading(constants.DELETE_EXISTING_TODO, deleteTodo)
}