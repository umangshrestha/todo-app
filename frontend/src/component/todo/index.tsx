import { useState } from "react"
import { useFindAllTodo } from "../../api/todo";


export const Todo = () => {
    const [page, setPage] = useState(0);

    const { data, isLoading, error } = useFindAllTodo(page);

    return (
        <div>
            {
                JSON.stringify(data || "No data")
            }


        </div>
    )
}