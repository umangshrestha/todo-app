import React, { useState } from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Dialog, DialogTitle, ListItemIcon, ListItemText } from '@mui/material';
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { TodoAddForm } from "./component/todoAddForm";
import { Link, } from 'react-router-dom';
import { DrawerItems } from './config/drawer';

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <div className="app-container">
            <Toolbar sx={{ height: '64px', backgroundColor: "#1e88e5" }}>
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
                    {DrawerItems.map((item, index) => (
                        <ListItem key={index} component={Link} to={item.link} onClick={() => setDrawerOpen(false)}  >
                            <ListItemIcon>{item.icon} </ListItemIcon>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <TodoAddForm open={open} onClose={() => setOpen(false)} />
        </div>
    )
}

export default App;