import React from "react";
import style from './loader.module.css';
import { CircularProgress } from "@mui/material";

interface IProp {
    isLoading: boolean
};

export const SpinningLoader = ({ isLoading }: IProp) => (
    <div className={style.loader} style={{ display: isLoading ? 'flex' : 'none' }}>
        <CircularProgress size="200px" color="primary" hidden={!isLoading} />
    </div>
);
