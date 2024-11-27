import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { validateAuthApi, resetPasswoedApi } from '../login/state/api';
import { Button, Card } from '@mui/material';

const ForgotPassworComponent = () => {
    const location = useLocation();
    const [userData, setUSerData] = React.useState(null)
    const [newPassword, setNewPassword] = React.useState(null)
    const parameter = location.pathname.substring(1);

    const onPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const [verifiedAuth, setVerifiedAuth] = React.useState(false)

    const checkForVerification = async () => {
        const data = await validateAuthApi({ token: parameter })
        if (data) {
            setVerifiedAuth(true)
            setUSerData(data.data.message)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const payload = {
            token: parameter,
            password: newPassword
        }

        const data = await resetPasswoedApi(payload)
        console.log('dtaaaa', data)


    }

    React.useEffect(() => {
        checkForVerification()
    }, [])


    return (
        <>
            {
                verifiedAuth &&
                <>
                    <Card>
                        <h1>Hiiii</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                variant="outlined"
                                placeholder="ENTER NEW PASSWORD"
                                onChange={(e) => onPasswordChange(e)}

                            />

                            <Button type='submit'>Submit</Button>

                        </form>

                    </Card>
                </>
            }
        </>
    )
}

export default ForgotPassworComponent