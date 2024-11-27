import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import './remainders.css';

const DummyData = () => {
    const remainders = [{
        data: 'REM',
        endDate: '14/06/2024'
    },
    {
        data: 'REM',
        endDate: '14/06/2024'
    },
    {
        data: 'REM',
        endDate: '14/06/2024'
    },
    {
        data: 'REM',
        endDate: '14/06/2024'
    },
    {
        data: 'REM',
        endDate: '14/06/2024'
    },
    {
        data: 'REM',
        endDate: '14/06/2024'
    },
    {
        data: 'REM',
        endDate: '14/06/2024'
    },
    {
        data: 'REM',
        endDate: '14/06/2024'
    },
    {
        data: 'REM',
        endDate: '14/06/2024'
    },
    {
        data: 'REM',
        endDate: '14/06/2024'
    },


    ]
    return (
        <Box className="reminder-display-container">
            <Paper elevation={3} className="reminder-display-paper">
                <Typography variant="h5" component="h2" className="reminder-display-heading">
                    My Reminders
                </Typography>
                <Box className="reminder-list">
                    {remainders.map((reminder, index) => (
                        <Box key={index} className="reminder-item">
                            <Typography variant="body1">{reminder.data}</Typography>
                            <Typography variant="body2" className="end-date">{reminder.endDate}</Typography>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default DummyData;
