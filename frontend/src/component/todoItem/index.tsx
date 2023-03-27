import { Card, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Delete";

export const TodoItem = () => (
    <Card>
        <CardActions>
            <IconButton aria-label="delete task">
                <DeleteIcon />
            </IconButton>
            <IconButton aria-label="mark task as complete">
                <DoneIcon />
            </IconButton>
        </CardActions>
    </Card>
)