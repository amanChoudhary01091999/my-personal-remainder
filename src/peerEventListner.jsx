import React from 'react';
import notifySound from '../../my-react-app/src/assets/notification-9-158194.mp3';
import { Howl, Howler } from 'howler';


export default function PeerEventListener() {
    let sound;
    const channel = new BroadcastChannel('push-sw');
    React.useEffect(() => {
        sound = new Howl({
            mute: false,
            src: [notifySound]
        });
        // initialiseSocket();
        channel.addEventListener('message', (ev) => {
            if (ev.data.data) {
                try {
                    const clickAction = JSON.parse(ev.data.data.click_action);
                    console.log('clickAction::::', clickAction);
                    if (clickAction.type === 'ORDER_UPDATE') {
                        if (clickAction.order_for === 'CHECKOUT') {
                            if (clickAction.state === 'new') {
                                console.log('sound_play')
                                sound.play();
                            }
                        }
                        const refreshEvent = new Event('pageRefresh');
                        window.dispatchEvent(refreshEvent);
                    }
                } catch (e) {
                    console.log('e:::::', e)
                    sound.play();
                }
            }
        })
    }, []);


    const initialiseSocket = async () => {
        try {
            let intervalTimer;
            const ws = new WebSocket('wss://ws-node.ndhgo.com/ws');
            window.peerEmitter = ws;
            // ws.on('open', () => {
            //     ws.send(JSON.stringify({ type: 'generic', message: 'Message From Client' }))
            // });
            // ws.on('error', () => {
            //     console.log('socket_error')
            // });
            // ws.on('message', ({ data: msgDt }) => {
            //     const dt = JSON.parse(msgDt);
            //     if (dt.buzzer) {
            //         sound.play();
            //     }
            // });
            ws.onopen = () => {
                ws.send(JSON.stringify({ type: 'generic', message: 'Message From Client' }));
                intervalTimer = setInterval(() => {
                    window.peerEmitter.send(JSON.stringify({ type: 'pong', message: 'Message From Client' }))
                }, 5000)
            }

            ws.onerror = (error) => {
                console.log(`WebSocket error: ${error}`)
            }
            ws.onclose = () => {
                clearInterval(intervalTimer);
                console.log('connection closed');
            }
            ws.onmessage = ({ data: msgDt }) => {
                const dt = JSON.parse(msgDt);
                if (dt.type === 'ORDER_UPDATE') {
                    const refreshEvent = new Event('pageRefresh');
                    window.dispatchEvent(refreshEvent);
                    // dispatch(updateOrderBasedOnNotificaition(dt));
                }
                if (dt.buzzer) {

                    sound.play();
                }
            };
        } catch (e) {
            console.error(e);
        }

    }
    return (
        <></>
    )
}