import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { LoaderContext } from './component/loader/context';
import { SpinningLoader } from './component/loader';
import { NotificationContext } from './component/notification/context';
import { Notification } from './component/notification';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './style.css'
import App from './App'
import { HashRouter, Route, Routes } from 'react-router-dom';
import { DrawerItems } from './config/drawer';

const container = document.getElementById('root')

const root = createRoot(container!)

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [serverity, setServerity] = useState<"success" | "error" | "warning" | "info">("success");
    const [open, setOpen] = useState(false);


    const onError = (error: any) => {
        setMessage(error?.message || "Oops!! Something went wrong");
        setServerity("error");
        setOpen(true);
    }

    const onSettled = () => {
        setIsLoading(false);
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { onError, onSettled },
            mutations: { onError, onSettled }
        }
    });

    return (
        <HashRouter basename={"/"}>
            <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
                <NotificationContext.Provider value={{ message, setMessage, serverity, setServerity, open, setOpen }}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        <Routes>
                            {DrawerItems.map((item, index) => <Route key={index} path={item.link} element={item.element} />)}
                        </Routes>
                        <SpinningLoader />
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
