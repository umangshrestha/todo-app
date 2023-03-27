import React, { useState } from 'react';
import './App.css';
import { Todo } from './component/todo';
import { Drawer, IconButton, Toolbar, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Dialog, DialogTitle } from "@mui/material";
import { TodoAddForm } from "./component/todoAddForm";

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <div className="app-container">
            <Toolbar className="toolbar">
                <IconButton aria-label="menu" edge="start" onClick={() => setDrawerOpen(!drawerOpen)} style={{ color: 'white', marginRight: 2 }}>
                    <MenuIcon />
                </IconButton>
                <h1> Todo App </h1>
                <span className="spacer" />
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Add Todo
                </Button>
            </Toolbar>
            <Drawer
                anchor="left"
                keepMounted
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                variant="temporary"
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <List className="list">
                    <ListItem className="list-item"
                        key="home"
                        to="/home">
                        <ListItemText primary="Home" />
                    </ListItem>
                </List>
            </Drawer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Todo</DialogTitle>
                <TodoAddForm onClose={() => setOpen(false)} />
            </Dialog>
        </div>
    )
}

export default App;
