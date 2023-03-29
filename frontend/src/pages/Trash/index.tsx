import React from 'react'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from './trash.module.css';

const Trash = () => {
    return (
        <Box className={style.message}>
            <AutoDeleteIcon fontSize="large" />
            <Typography>
                Items in trash are deleted permanently after 28 days.
            </Typography>
        </Box>
    );
}

export default Trash;