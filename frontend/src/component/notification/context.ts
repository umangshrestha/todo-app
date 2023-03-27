import { createContext } from "react";

interface INotificationContext {
    serverity: 'success' | 'info' | 'warning' | 'error';
    message: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    setMessage: (message: string) => void;
    setServerity: (serverity: 'success' | 'info' | 'warning' | 'error') => void;
}

export const NotificationContext = createContext<INotificationContext>({
    serverity: 'success',
    message: '',
    open: false,
    setOpen: () => { },
    setMessage: () => { },
    setServerity: () => { }
});
