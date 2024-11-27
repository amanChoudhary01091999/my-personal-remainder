import * as constants from './constants'


export function userAllTodos(payload) {
    return {
        type: constants.GET_ALL_TODOS,
        payload
    }
}




export function addNewTodo(payload) {
    console.log("ADDDDDDDDDDDDDDDDDDD")
    return {
        type: constants.ADD_NEW_TODO,
        payload
    }
}

export function editTodo(payload) {
    console.log("ADDDDDDDDDDDDDDDDDDD")
    return {
        type: constants.EDIT_NEW_TODO,
        payload
    }
}



export function deleteTodo(payload) {
    return {
        type: constants.DELETE_EXISTING_TODO,
        payload
    }
}





