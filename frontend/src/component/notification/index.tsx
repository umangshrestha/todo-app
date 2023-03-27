import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useContext } from "react";
import { NotificationContext } from "./context";

export const Notification = () => {
    const { serverity, message, open, setOpen } = useContext(NotificationContext);

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={() => setOpen(false)} severity={serverity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}