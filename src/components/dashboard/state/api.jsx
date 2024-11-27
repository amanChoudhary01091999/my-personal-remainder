import request from '../../../request'




export const getAllTodoListApi = (payload) => {
    const options = {
        postData: {
            url: `reminders/all`,
            method: 'post',
            data: payload
        }
    }
    return request(options)
}

export const addNewTodoApi = (payload) => {
    const options = {
        postData: {
            url: `reminders/add`,
            method: 'post',
            data: payload
        }
    }
    return request(options)
}

export const getRemainderById = (payload) => {
    const options = {
        postData: {
            url: `reminders/${payload}`,
            method: 'get',
        }
    }
    return request(options)
}


export const editExistingTodo = (payload) => {
    console.log({ payload })
    const options = {
        postData: {
            url: `reminders/edit/${payload.id}`,
            method: 'put',
            data: payload
        }
    }
    return request(options)
}

export const deletUserRemainder = (payload) => {
    const options = {
        postData: {
            url: `reminders/delete/${payload.id}`,
            method: 'delete',
            data: payload
        }
    }
    return request(options)
}