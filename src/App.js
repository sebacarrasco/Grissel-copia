import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRouter } from './routers/AppRouter';
import { persistor, store } from './store/store';


export const App = () => {
  
    return (
        <Provider store={ store }>
            <PersistGate loading={ null } persistor={ persistor }>
                <AppRouter />
            </PersistGate>
        </Provider>
    )
}