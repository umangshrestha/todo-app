import React from "react";
import Alert from "@mui/material/Alert";
import { useCountTodo } from "../../api/todo";

import Delete from "@mui/icons-material/Delete";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const Home = () => {
    const { data } = useCountTodo();

    return (
        <>
            <div>
                <h2>Total: {data?.total}</h2>
                <h2>Todo: {data?.todo}</h2>
                <h2>Completed: {data?.completed}</h2>
                <IconButton aria-label="link to trash" component={Link} to="/trash">
                    <Badge badgeContent={data?.deleted || "0"} color="error">
                        <Delete color="action" />
                    </Badge>
                </IconButton>
            </div>
        </>
    )
}

export default Home;