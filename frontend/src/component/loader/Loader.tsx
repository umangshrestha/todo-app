import React, { useContext } from "react";
import style from './loader.module.css';
import { LoaderContext } from "./context";
import CircularProgress from '@mui/material/CircularProgress';

export const Loader = () => {
    const { isLoading } = useContext(LoaderContext);

    return (
        <div className={style.loader} style={{ display: isLoading ? 'flex' : 'none' }}>
            <CircularProgress size="200px" color="primary" hidden={!isLoading} />
        </div>
    )
};
