import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CountTodo, CreateTodo, DeleteTodo, FindAllTodo, UpdateTodo } from "../../wailsjs/go/main/App";
import { database } from "../../wailsjs/go/models";
import { LoaderContext } from "../component/loader/context";
import { NotificationContext } from "../component/notification/context";

const queryClient = new QueryClient();
export default queryClient;

export const useUpdateTodo = () => {
    const { setIsLoading } = useContext(LoaderContext);
    const { setMessage, setServerity } = useContext(NotificationContext);

    const { mutate: updateTodoFn, isLoading, error } = useMutation({
        mutationFn: ({ id, ...val }: { id: number, title: string, completed: boolean }) => {
            setIsLoading(true);
            return UpdateTodo(id, val)
        },
        onSuccess: () => {
            setMessage('Todo updated successfully');
            setServerity('success');
        },
        onError: (error: any) => {
            setMessage(error?.message || "Oops!! Something went wrong");
            setServerity("error");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            setIsLoading(false);
        }
    });
    return { updateTodoFn, isLoading, error }
}

export const useAddTodo = () => {
    const { setIsLoading } = useContext(LoaderContext);
    const { setMessage, setServerity } = useContext(NotificationContext);

    const { mutate: addTodoFn, isLoading, error } = useMutation({
        mutationFn: (input: database.CreateInput) => {
            setIsLoading(true);
            return CreateTodo(input);
        },
        onSuccess: () => {
            setMessage('Todo added successfully');
            setServerity('success');
        },
        onError: (error: any) => {
            setMessage(error?.message || "Oops!! Something went wrong");
            setServerity("error");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            setIsLoading(false);
        }
    });

    return { addTodoFn, isLoading, error }
}


export const useDeleteTodo = ({ hardDelete = false }: { hardDelete: boolean }) => {
    const { setIsLoading } = useContext(LoaderContext);
    const { setMessage, setServerity } = useContext(NotificationContext);

    const { mutate: deleteTodoFn, isLoading, error } = useMutation({
        mutationFn: (id: number) => {
            setIsLoading(true);
            return DeleteTodo(id, hardDelete)
        },
        onSuccess: () => {
            setMessage('Todo deleted successfully');
            setServerity('success');
        },
        onError: (error: any) => {
            setMessage(error?.message || "Oops!! Something went wrong");
            setServerity("error");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["todos"]);
            setIsLoading(false);
        }
    });

    return { deleteTodoFn, isLoading, error }
}

export const useFindAllTodo = (page: number) => {
    const limit = 10;
    const { setIsLoading } = useContext(LoaderContext);
    const { setMessage, setServerity } = useContext(NotificationContext);

    const { data, isLoading, error } = useQuery(
        ["todos", { page }],
        () => {
            setIsLoading(true);
            return FindAllTodo({ offset: page * limit })
        }, {
        onError: (error: any) => {
            setMessage(error?.message || "Oops!! Something went wrong");
            setServerity("error");
        },
        onSettled: () => setIsLoading(false),
    })

    return { data, isLoading, error }
}

export const useCountTodo = () => {
    const { setIsLoading } = useContext(LoaderContext);
    const { setMessage, setServerity } = useContext(NotificationContext);

    const { data, isLoading, error } = useQuery(
        ["todos"],
        () => {
            setIsLoading(true);
            return CountTodo();
        }, {
        onError: (error: any) => {
            setMessage(error?.message || "Oops!! Something went wrong");
            setServerity("error");
        },
        onSettled: () => setIsLoading(false),
    })

    return { data, isLoading, error }
}
