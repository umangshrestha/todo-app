import React from "react";
import { Box, Button, Checkbox, Dialog, DialogTitle, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useFormik } from "formik";
import styles from "./todoAddForm.module.css";
import { useAddTodo } from "../../api/todo";
import { database } from "../../../wailsjs/go/models";
import { validationSchema } from "./validationSchema";

const initialValues = {
    title: '',
    completed: false,
}

interface Iprop {
    onClose: () => void
    open: boolean
}
export const TodoAddForm = ({ onClose, open }: Iprop) => {
    const { addTodoFn, isLoading } = useAddTodo();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (formData: database.CreateInput) => {
            const data = addTodoFn(formData)
            formik.resetForm();
            return data;
        }
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Todo</DialogTitle>
            <Box className={styles.inner}>
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                        <FormControlLabel
                            control={<Checkbox
                                inputProps={{ 'aria-label': 'Checkbox demo' }}
                                color="primary"
                                checked={formik.values.completed}
                                onChange={formik.handleChange}
                                name="completed" />}
                            label="Completed"
                            labelPlacement="end" />
                    </FormGroup>
                    <Button variant="contained" color="primary" type="submit" disabled={isLoading}> Submit </Button>
                    <Button variant="contained" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}> Cancel </Button>
                </form>
            </Box>
        </Dialog >
    );
}
