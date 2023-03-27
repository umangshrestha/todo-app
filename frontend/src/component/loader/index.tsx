import React, { useContext } from "react";
import style from './loader.module.css';
import { CircularProgress } from "@mui/material";
import { LoaderContext } from "./context";

export const SpinningLoader = () => {
    const { isLoading } = useContext(LoaderContext);

    return (
        <div className={style.loader} style={{ display: isLoading ? 'flex' : 'none' }}>
            <CircularProgress size="200px" color="primary" hidden={!isLoading} />
        </div>
    )
};
