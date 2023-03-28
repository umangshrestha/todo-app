import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useContext } from "react";
import { NotificationContext } from "./context";

export const Notification = () => {
    const { serverity, message, setMessage } = useContext(NotificationContext);

    const onClose = () => setMessage('');
    return (
        <Snackbar open={message !== ''} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={onClose} severity={serverity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}