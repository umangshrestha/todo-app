import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { SpinningLoader } from "../loader"
import { FindAllTodo } from "../../../wailsjs/go/main/App"
import { Button } from "@mui/material";

const limit = 10;

export const Todo = () => {
    const [page, setPage] = useState(0);

    const { data, isLoading, error } = useQuery({
        queryKey: ["todo", page],
        queryFn: () => FindAllTodo({ offset: page * limit }),
    })

    return (
        <div>
            <h1>{JSON.stringify(data)}</h1>



            <SpinningLoader isLoading={isLoading} />
        </div>
    )
}