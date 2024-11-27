import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletUserRemainder, getAllTodoListApi, getRemainderById } from './state/api';
import { addNewTodo, deleteTodo, userAllTodos } from './state/axtions';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid, InputLabel, MenuItem, Select, Box, TextField, Container, DialogActions, DialogContent, Paper, Typography, CssBaseline, Card } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import SingleReminder from '../soundEffects';
import './dashboard.css'

let mode = 'ADD'
const Dashboard = () => {
    const userTodoListRedux = useSelector((state) => state.loginSignupReducer.userTodosData);
    const dispatch = useDispatch()
    const user = localStorage.getItem('user')
    const [open, setOpen] = React.useState(false)
    const [editIndex, setEditIndex] = React.useState(-1)
    const [editId, setEditId] = React.useState(null)
    const { control, handleSubmit, watch, formState, setValue, getValues } = useForm({
    });

    React.useEffect(() => {
        dispatch(userAllTodos({ data: { userId: user } }))
    }, [])

    const userTodos = React.useMemo(() => {
        let data = null
        if (userTodoListRedux) {
            data = userTodoListRedux
        }
        return data
    }, [userTodoListRedux])

    const handleAddonTypeChange = (field, val) => {
        field.onChange(val.target.value)
    }

    const onSubmit = (data) => {
        const remainder = {
            priority: data.priority,
            content: data.content,
            startDate: new Date().getTime(),
            endDate: new Date(data.endDate.$d).getTime(),
            isActive: true
        }

        dispatch(addNewTodo({ data: remainder, callBackfn: () => setOpen(false), editIndex, mode, user, editId }))

    }

    const editRemainder = async (id, index) => {
        setEditId(id)
        const data = await getRemainderById(id)
        if (data) {
            setOpen(true)
            mode = "EDIT"
            setEditIndex(index)
            setValue('content', data.content)
            setValue('priority', data.priority)
            const epochTime = data.endDate
            const initialDate = dayjs(epochTime);
            setValue('endDate', initialDate);
        }
    }

    const onHandleClose = () => {
        setOpen(false)
        mode = 'ADD'
        setEditId(null)
    }

    const deleteRemainder = (id, index) => {
        dispatch(deleteTodo({ id, editIndex: index, mode: 'DELETE' }))
    }

    return (
        <>
            {userTodos?.length > 0 ? userTodos?.map((item, index) => {
                return (
                    <>
                        {
                            item.isActive ?
                                <>
                                    <div className='heading'>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '30px' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} >
                                                <p style={{ color: 'white', fontFamily: 'Lora', marginBottom: '10px', fontSize: '2rem' }}>Your Remainders</p>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                                    <Button onClick={() => setOpen(true)}>+ Add</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="main-container">
                                        <div className='alarmContainer'>
                                            <SingleReminder
                                                key={item._id}
                                                id={item._id}
                                                index={index}
                                                startDate={item.startDate}
                                                alarmTime={item.endDate}
                                                content={item.content}
                                                priority={item.priority}
                                                onDeleteRemainder={deleteRemainder}
                                            />
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="container">
                                        <div className="centered-div">
                                            <div>
                                                <h1 style={{ color: 'white', fontSize: '2rem' }}>No Active Reminders</h1>
                                            </div>
                                            <Button style={{ fontSize: '1rem', fontFamily: 'Lora' }} onClick={() => setOpen(true)}>
                                                Add your remainders!
                                            </Button>

                                        </div>
                                    </div>
                                </>
                        }
                    </>
                );
            }) : <>
                <div className="container">
                    <div className="centered-div">
                        <div>
                            <h1 style={{ color: 'white', fontSize: '2rem' }}>You dont have any remainders.</h1>
                        </div>
                        <Button style={{ fontSize: '1rem', fontFamily: 'Lora' }} onClick={() => setOpen(true)}>
                            Add your remainders!
                        </Button>

                    </div>
                </div>
            </>
            }
            <Dialog open={open}
                PaperProps={{
                    sx: {
                        color: 'white',
                        border: '1px solid #D3D3D3', // Light grey border
                        background: `
                          linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
                          url('https://wallpapercave.com/wp/wp1933646.jpg') no-repeat center center / cover
                        `,
                    },

                }} >
                <DialogContent>
                    <DialogTitle sx={{ fontFamily: 'Lora', textAlign: 'center', fontStyle: 'italic' }}>Add a Reminder</DialogTitle>
                    <Container>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputLabel style={{ color: 'white', fontFamily: 'Lora', fontStyle: 'italic', marginBottom: '10px' }}>Enter content</InputLabel>
                                    <Controller
                                        name="content"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.1)', fontFamily: 'Lora', textAlign: 'center', fontStyle: 'italic', border: '0.5px solid white' }}
                                                InputProps={{
                                                    style: { color: 'white' },
                                                    sx: {
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                        },
                                                        '& .MuiInputBase-input::placeholder': {
                                                            color: 'white',
                                                            opacity: 1,
                                                        },
                                                    },
                                                }}
                                                InputLabelProps={{
                                                    style: { color: 'white' },
                                                    sx: {
                                                        '&.Mui-focused': {
                                                            color: 'white',
                                                        },
                                                    },
                                                }}
                                            />


                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel style={{ color: 'white', fontFamily: 'Lora', fontStyle: 'italic', marginBottom: '10px' }}>Set Priority</InputLabel>
                                    <Controller
                                        name="priority"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                fullWidth
                                                style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.1)', fontFamily: 'Lora', fontStyle: 'italic', border: '1px solid white' }}
                                                InputProps={{
                                                    style: { color: 'white' },
                                                    sx: {
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: 'white',
                                                            },
                                                        },
                                                        '& .MuiInputBase-input::placeholder': {
                                                            color: 'white',
                                                            opacity: 1,
                                                        },
                                                    },
                                                }}
                                                InputLabelProps={{
                                                    style: { color: 'white' },
                                                    sx: {
                                                        '&.Mui-focused': {
                                                            color: 'white',
                                                        },
                                                    },
                                                }}
                                                {...field}
                                                variant="outlined"
                                                onChange={(val) => handleAddonTypeChange(field, val)}

                                            >
                                                <MenuItem value={'HIGH'}>HIGH</MenuItem>
                                                <MenuItem value={'LOW'}>LOW</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ alignItems: 'center' }}>
                                    <InputLabel style={{ color: 'white', fontFamily: 'Lora', fontStyle: 'italic', marginBottom: '10px' }}>Time</InputLabel>
                                    <Controller
                                        name="endDate"
                                        control={control}
                                        // defaultValue={dayjs()}
                                        render={({ field }) => (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateTimePicker
                                                    {...field}
                                                    disablePast={true}

                                                    minutesStep={1}
                                                    renderInput={(params) => <TextField fullWidth style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.1)', fontFamily: 'Lora', fontStyle: 'italic', border: '1px solid white' }} />}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <DialogActions sx={{ justifyContent: 'center', pt: 2 }}>
                                <Button sx={{
                                    color: 'red',
                                    fontFamily: 'Lora',
                                    fontStyle: 'italic',
                                    marginBottom: '10px',
                                    border: '1px solid red'
                                }}
                                    variant="outlined" type="button" disableElevation onClick={() => onHandleClose()}>
                                    Close
                                </Button>
                                <Button sx={{
                                    color: 'primary',
                                    fontFamily: 'Lora',
                                    fontStyle: 'italic',
                                    marginBottom: '10px',
                                    border: '1px solid primary'
                                }}
                                    variant="outlined" type="submit" disableElevation onClick={() => onHandleClose()}>
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    </Container>
                </DialogContent>
            </Dialog >
        </>
    );
}
export default Dashboard




