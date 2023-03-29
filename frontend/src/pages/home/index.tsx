import React from "react";
import Alert from "@mui/material/Alert";
import { useCountTodo } from "../../api/todo";


const Home = () => {
    const { data, isLoading, error } = useCountTodo();

    return (
        <>
            <div>
                <h2>Total: {data?.total}</h2>
                <h2>Todo: {data?.todo}</h2>
                <h2>Completed: {data?.completed}</h2>
                <h2>Deleted: {data?.deleted}</h2>
            </div>
        </>
    )
}

export default Home;