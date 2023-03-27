import React from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import styles from "./todoAddForm.module.css";
import { SpinningLoader } from "../loader";
import { useAddTodo } from "../../api/todo";
import Alert from "@mui/material";

const initialValues = {
    title: '',
    completed: false,
}

const validationSchema = Yup.object({
    title: Yup.string()
        .max(255, 'Must be 255 characters or less')
        .min(5, 'Must be 5 characters or more')
        .required('Required')
})

interface Iprop {
    onClose: () => void
}
export const TodoAddForm = ({ onClose }: Iprop) => {
    const { addTodoFn, isLoading } = useAddTodo();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (formData: { title: string, completed: boolean }) => {
            const data = await addTodoFn(formData)
            formik.resetForm();
            return data;
        }
    });


    return (
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
    );
}
