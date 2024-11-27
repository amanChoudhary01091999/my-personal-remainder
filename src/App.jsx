import React, { useEffect } from 'react';
import AppRoutes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import NotificationComponent from './components/test-notification';
import MessagePopup from './components/messageComponent/messagePopup';
import './app.css'

function App() {

  return (

    <Provider store={store}>
      <MessagePopup />
      {/* <NotificationComponent /> */}
      <AppRoutes />
      {/* <ToastContainerComponent /> */}
    </Provider>

  );
}

export default App;
