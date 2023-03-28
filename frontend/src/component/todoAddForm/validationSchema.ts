import * as Yup from 'yup';

export const validationSchema = Yup.object({
    title: Yup.string()
        .max(255, 'Must be 255 characters or less')
        .min(5, 'Must be 5 characters or more')
        .required('Required'),
    completed: Yup.boolean()
        .required('Optional')
        .default(false)
})
