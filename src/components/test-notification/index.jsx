import React, { useEffect } from 'react';
import { Howl } from 'howler';

import notifySound from '../../assets/notification-9-158194.mp3';

const NotificationComponent = () => {
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
    }, []);

    const playSound = () => {
        const sound = new Howl({
            src: [notifySound]
        });
        sound.play();
    };

    const setTimer = () => {
        const targetTime = new Date().getTime() + 10000; // 5 seconds from now
        if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SET_TIMER', targetTime });
        }
    };

    return (
        <div>
            <h1>Notification Component</h1>
            <button onClick={setTimer}>Set Notification Timer</button>
        </div>
    );
};

export default NotificationComponent;
