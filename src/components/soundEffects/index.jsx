import React, { useState, useEffect, useRef } from "react";
import notifySound from '../../assets/notification-9-158194.mp3';
import { Howl, Howler } from 'howler';
import { Button, Card } from "@mui/material";



const SingleReminder = ({ id, alarmTime, content, soundFile, priority, onDeleteRemainder, index }) => {
    const [timeRemaining, setTimeRemaining] = useState(Math.floor(alarmTime / 1000) - Math.floor(Date.now() / 1000));
    const interval = useRef();;

    const playSound = () => {
        const sound = new Howl({
            src: [notifySound]
        });
        sound.play();

        // unregisterServiceWorker();
    };

    const unregisterServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                for (let registration of registrations) {
                    registration.unregister();
                    console.log('Service Worker unregistered:', registration.scope);
                }
            }).catch(error => {
                console.error('Service Worker unregistration failed:', error);
            });
        }
    };


    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/serviceWorker.jsx').then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(error => {
                console.error('Service Worker registration failed:', error);
            });

            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'PLAY_SOUND') {
                    playSound();
                }
            });

        }

        Notification.requestPermission().then(permission => {
            if (permission !== 'granted') {
                alert('Please enable notifications in your browser settings.');
            }
        });

        if (timeRemaining === 0) {
            playSound()
        }

        // return () => {
        //     clearInterval(interval.current);
        //     unregisterServiceWorker(); // Unregister on component unmount
        // };




    }, []);




    useEffect(() => {
        interval.current = setInterval(() => {
            setTimeRemaining(Math.floor(alarmTime / 1000) - Math.floor(Date.now() / 1000));
        }, 1000);

        return () => clearInterval(interval.current);
    }, [alarmTime]);

    useEffect(() => {
        setTimer();
    }, []);

    const setTimer = () => {
        const targetTime = alarmTime;
        console.log({ targetTime })
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SET_TIMER', data: { targetTime, content } });
        }
    };

    function formatTimestamp(timestamp) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(timestamp);
        const month = months[date.getMonth()];
        const day = date.getDate();
        let hours = date.getHours();
        const dayName = days[date.getDay()];
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${month} ${day} ${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    const getMonthAndDay = (val) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(val);
        console.log("Dateeeee", date)
        const day = date.getDate();
        const month = months[date.getMonth()];
        const dayName = days[date.getDay()];
        return `${dayName} ${day} ${month} `;
    }

    const getDayHour = (val) => {
        const date = new Date(val);
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`

    }

    console.log({ timeRemaining })

    return (
        <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '30px', color: 'white', borderRadius: '20px', marginTop: '100px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '1rem', fontFamily: 'Lora', color: 'white', margin: 0 }}>{getDayHour(alarmTime)}</p>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ margin: 0 }}>{getMonthAndDay(alarmTime)}</p>
                        <Button onClick={() => onDeleteRemainder(id, index)}>Delete</Button>
                    </div>
                </div>

                <p style={{ fontSize: '1rem', fontFamily: 'Lora', color: 'white', margin: 0 }}>Priority:<span style={{ color: 'red', fontSize: '1rem', fontFamily: 'Lora', fontWeight: '2rem', marginLeft: '10px' }}>{priority}</span></p>
                <p style={{ fontSize: '1rem', fontFamily: 'Lora', color: 'white', margin: 0 }}>{content}</p>
            </div>
        </Card>

    );
}

export default SingleReminder;

