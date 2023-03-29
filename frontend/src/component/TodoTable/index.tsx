import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckBox from "@mui/material/Checkbox";
import { SelectedTab } from "../../component/TodoTable/selectedTab";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";
import { database } from "../../../wailsjs/go/models";
import { useDeleteTodo, useFindAllTodo, useUpdateTodo } from "../../api/todo";
import { useState } from "react";


interface IProp {
    selectedTab: SelectedTab;
}

const TodoTable = ({ selectedTab }: IProp) => {
    const { updateTodoFn } = useUpdateTodo();
    const { deleteTodoFn } = useDeleteTodo({ hardDelete: false });

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);

    const { data } = useFindAllTodo({ page, limit });
    const filterData = () => {
        const list = data?.data;
        if (!list) {
            return [];
        }
        switch (selectedTab) {
            case SelectedTab.All:
                return list;
            case SelectedTab.Active:
                return list.filter(todo => !todo.isCompleted);
            case SelectedTab.Completed:
                return list.filter(todo => todo.isCompleted);
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Created At</TableCell>
                        <TableCell align="right">Modified At</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Completed</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterData()
                        .map(({ id, createdAt, updatedAt, title, isCompleted }) => (
                            <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="right">{id}</TableCell>
                                <TableCell align="right">{createdAt}</TableCell>
                                <TableCell align="right">{updatedAt}</TableCell>
                                <TableCell component="th" scope="row">{title}</TableCell>
                                <TableCell align="right">
                                    <CheckBox checked={isCompleted} inputProps={{ 'aria-label': 'controlled' }} onChange={() => updateTodoFn({ id, isCompleted })} />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" sx={{ color: 'error.main' }} onClick={() => deleteTodoFn(id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <Pagination count={Math.round((data?.count || 0) / limit)} page={page} onChange={(_, v) => setPage(v)} />
        </TableContainer>)
}

export default TodoTable;