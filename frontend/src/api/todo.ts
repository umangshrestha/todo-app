import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CountTodo, CreateTodo, DeleteTodo, FindAllTodo, UpdateTodo } from "../../wailsjs/go/main/App";
import { database } from "../../wailsjs/go/models";
import { LoaderContext } from "../component/loader/context";
import { NotificationContext } from "../component/notification/context";


export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    const { setIsLoading } = useContext(LoaderContext);
    const { setMessage, setServerity, setOpen } = useContext(NotificationContext);

    const { mutate: updateTodoFn, isLoading, error } = useMutation(
        ({ id, ...val }: { id: number, title: string, completed: boolean }) => {
            setIsLoading(true);
            return UpdateTodo(id, val)
        }, {
        onSuccess: () => {
            setMessage('Todo updated successfully');
            setServerity('success');
            setOpen(true);
            queryClient.invalidateQueries(['todos']);
        }
    });
    return { updateTodoFn, isLoading, error }
}

export const useAddTodo = () => {
    const queryClient = useQueryClient();
    const { setIsLoading } = useContext(LoaderContext);
    const { setMessage, setServerity, setOpen } = useContext(NotificationContext);

    const { mutate: addTodoFn, isLoading, error } = useMutation(
        (input: database.CreateInput) => {
            setIsLoading(true);
            return CreateTodo(input);
        }, {
        onSuccess: () => {
            setMessage('Todo added successfully');
            setServerity('success');
            setOpen(true);
            return queryClient.invalidateQueries(['todos']);
        }
    });

    return { addTodoFn, isLoading, error }
}


export const useDeleteTodo = ({ hardDelete = false }: { hardDelete: boolean }) => {
    const queryClient = useQueryClient();
    const { setIsLoading } = useContext(LoaderContext);

    const { mutate: deleteTodoFn, isLoading, error } = useMutation(
        (id: number) => {
            setIsLoading(true);
            return DeleteTodo(id, hardDelete)
        }, {
        onSuccess: () => queryClient.invalidateQueries(['todos'])
    });

    return { deleteTodoFn, isLoading, error }
}

export const useFindAllTodo = (page: number) => {
    const limit = 10;
    const { setIsLoading } = useContext(LoaderContext);

    const { data, isLoading, error } = useQuery({
        queryKey: ["todos", page],
        queryFn: () => {
            setIsLoading(true);
            return FindAllTodo({ offset: page * limit })
        },
    })

    return {
        data, isLoading, error
    }
}

export const useCountTodo = () => {
    const { setIsLoading } = useContext(LoaderContext);

    const { data, isLoading, error } = useQuery({
        queryKey: ["todos"],
        queryFn: () => {
            setIsLoading(true);
            return CountTodo();
        },
    })

    return {
        data, isLoading, error
    }
}
