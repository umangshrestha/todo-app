import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Avatar, Link, Typography } from '@mui/material';


const AboutMe = () => (
    <div >
        <Avatar alt="Umang Shrestha" src="https://example.com/avatar.png" />
        <Typography variant="h4"> Umang shrestha </Typography>
        <Typography variant="h6"> Todo App </Typography>
        <div >
            <GitHubIcon />
            <Link href="https://github.com/umangshrestha/todo-app" target="_blank" rel="noopener">
                github.com/umangshrestha/todo-app
            </Link>
        </div>
    </div>
);


export default AboutMe;
