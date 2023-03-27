import React, { useState } from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, Dialog, DialogTitle } from '@mui/material';
import { Todo } from './component/todo';
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { TodoAddForm } from "./component/todoAddForm";
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import AboutMe from './pages/aboutme';

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <HashRouter basename={"/"}>
            <div className="app-container">
                <Toolbar className="toolbar">
                    <IconButton aria-label="menu" edge="start" onClick={() => setDrawerOpen(!drawerOpen)} style={{ color: 'white' }}>
                        <MenuIcon />
                    </IconButton>
                    <h1> Todo App </h1>
                    <span className="spacer" />
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        Add Todo
                    </Button>
                </Toolbar>
                <Drawer anchor="left" keepMounted open={drawerOpen} onClose={() => setDrawerOpen(false)} variant="temporary" ModalProps={{ keepMounted: true }} >
                    <List className="list">
                        <ListItem className="list-item" key="home">
                            <ListItem component={Link} to="/"> Home </ListItem>
                        </ListItem>
                        <ListItem className="list-item" key="about">
                            <ListItem component={Link} to="/about"> about </ListItem>
                        </ListItem>
                    </List>
                </Drawer>
                <Routes>
                    <Route path="/" element={<Todo />} />
                    <Route path="/about" element={<AboutMe />} />
                </Routes>
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Add Todo</DialogTitle>
                    <TodoAddForm onClose={() => setOpen(false)} />
                </Dialog>
            </div>
        </HashRouter>
    )
}

export default App;
