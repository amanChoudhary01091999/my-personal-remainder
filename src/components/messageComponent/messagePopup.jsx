

import React from 'react';
import ReactDOM from 'react-dom';
import { Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dismissMessgaePopup } from './state/action';


import Alert from '@mui/material/Alert';


function MessagePopup(props) {
    const messages = useSelector((state) => state.loginSignupReducer.messagePopUp)
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(dismissMessgaePopup())
    };
    return (
        messages.map((message) => {
            setTimeout(() => dispatch(dismissMessgaePopup()), 5000);
            return (
                ReactDOM.createPortal(

                    <Snackbar open={true} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={message.type}>
                            {message.body}
                        </Alert>
                    </Snackbar>
                    , document.getElementById('message_div'))
            )
        })
    )
}
export default MessagePopup;

