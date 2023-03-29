import React from "react";
import { useFormik } from "formik";
import styles from "./todoAddForm.module.css";
import { useAddTodo } from "../../api/todo";
import { database } from "../../../wailsjs/go/models";
import { validationSchema } from "./validationSchema";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const initialValues = {
    title: '',
    isCompleted: false,
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
        onSubmit: (formData: database.CreateInput) => {
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
                                checked={formik.values.isCompleted}
                                onChange={formik.handleChange}
                                name="isCompleted" />}
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
