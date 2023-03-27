import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FormEvent, useState } from "react"
import { SpinningLoader } from "../loader"
import { FindAllTodo } from "../../../wailsjs/go/main/App"
import { TodoAddForm } from "./todoAddForm";
import { Button, Dialog, DialogTitle } from "@mui/material";

const limit = 10;

export const Todo = () => {
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ["todo", page],
        queryFn: () => FindAllTodo({ offset: page * limit }),
    })

    return (
        <div>
            <h1>{JSON.stringify(data)}</h1>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Add Todo
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Todo</DialogTitle>
                <TodoAddForm onClose={() => setOpen(false)} />
            </Dialog>

            <SpinningLoader isLoading={isLoading} />
        </div>
    )
}