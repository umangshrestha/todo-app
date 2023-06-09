import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Loader, { LoaderContext } from './component/Loader';
import Notification, { NotificationContext } from './component/Notification';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './style.css'
import App from './App'
import { HashRouter } from 'react-router-dom';
import queryClient from './api/todo';

const container = document.getElementById('root')

const root = createRoot(container!)

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [serverity, setServerity] = useState<"success" | "error" | "warning" | "info">("success");

    return (
        <HashRouter basename="/">
            <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
                <NotificationContext.Provider value={{ message, setMessage, serverity, setServerity }}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        <Loader />
                        <Notification />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </NotificationContext.Provider>
            </LoaderContext.Provider>
        </HashRouter>
    )
};

root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
)
