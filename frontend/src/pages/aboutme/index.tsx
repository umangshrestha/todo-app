import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AboutMe = () => (
    <Card sx={{ maxWidth: 345, margin: 'auto', marginTop: '20px' }}>
        <CardHeader
            avatar={<Avatar alt="Umang Shrestha profile picture" src="https://example.com/avatar.png" />}
            title="Umang Shrestha"
            subtitle="https://github.com/umangshrestha"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                This is a todo app made with Walis Framework using Golang and React.
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton aria-label="github link" component={Link} to="https://github.com/umangshrestha/todo-app" >
                <GitHubIcon />
            </IconButton>
        </CardActions>
    </Card>
)

export default AboutMe;
