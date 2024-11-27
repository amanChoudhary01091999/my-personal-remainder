import { STORE_ALL_TODOS, STORE_NEW_TODO } from "../components/dashboard/state/constants";
import { LOGIN_REQUEST_SUCCESS, PASWORD_RESET_SUCCESS, SIGNUP_REQUEST_SUCCESS, } from "../components/login/state/constants";
import { SHOW_MESSAGE_POPUP, DISMISS_MESSGAE_POPUP } from "../components/messageComponent/state/constants";



export const loginSignupReducer = (
    state = {
        signupData: null,
        loginData: null,
        resetPasswordData: null,
        userTodosData: null,
        messagePopUp: []
    },
    action
) => {
    switch (action.type) {
        case SIGNUP_REQUEST_SUCCESS:
            return { ...state, signupData: action.payload }
        case LOGIN_REQUEST_SUCCESS:
            return { ...state, loginData: action.payload }
        case PASWORD_RESET_SUCCESS:
            return { ...state, resetPasswordData: action.payload }
        case STORE_ALL_TODOS:
            return { ...state, userTodosData: action.payload }
        case STORE_NEW_TODO:
            let currentState = [...state.userTodosData]
            const { editIndex, mode } = action.payload.extraInfo
            switch (mode) {
                case 'EDIT':
                    currentState[editIndex] = action.payload.data
                    currentState = Array.from(currentState)
                    break;
                case 'DELETE':
                    currentState.splice(editIndex, 1)
                    currentState = Array.from(currentState)
                    break
                default:
                    currentState = [...currentState, action.payload.data]
            }
            return {
                ...state,
                userTodosData: currentState
            }


        case SHOW_MESSAGE_POPUP:
            return {
                ...state, messagePopUp: [{
                    id: Date.now(),
                    body: action.payload.body,
                    visible: action.payload.visible,
                    type: action.payload.type,
                    position: action.payload.position ? action.payload.position : 'topRight',
                    errorCode: action.payload.errorCode
                }]
            }
        case DISMISS_MESSGAE_POPUP:
            return {
                ...state, messagePopUp: []
            }


        default:
            return state;
    }
};