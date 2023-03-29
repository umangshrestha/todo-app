import React, { useState } from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Drawer } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import { TodoAddForm } from "./component/todoAddForm";
import { Link, Route, Routes, useLocation, } from 'react-router-dom';
import { DrawerItems } from './config/drawer';

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <Toolbar sx={{ height: '64px', backgroundColor: "#1e88e5", zIndex: 2000 }}>
                <IconButton aria-label="menu" edge="start" onClick={() => setDrawerOpen(!drawerOpen)} style={{ color: 'white' }}>
                    {drawerOpen ?
                        <Close sx={{ fontSize: '2rem' }} /> :
                        <Menu sx={{ fontSize: '2rem' }} />
                    }
                </IconButton>
                <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                    Todo App
                </Typography>
                <span className="spacer" />
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Add Todo
                </Button>
            </Toolbar>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List className="list">
                    <ListItem sx={{ height: '64px' }} />
                    {DrawerItems.map((item, index) => (
                        <ListItem key={index} component={Link} to={item.link} onClick={() => setDrawerOpen(false)} className="list-item">
                            <ListItemIcon>{item.icon} </ListItemIcon>
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <TodoAddForm open={open} onClose={() => setOpen(false)} />
            <Typography variant="h4" sx={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                {location.pathname === "/" ? "Todo List" : location.pathname.slice(1).toUpperCase()}
            </Typography>
            <Routes>
                {DrawerItems.map((item, index) => <Route key={index} path={item.link} element={item.element} />)}
            </Routes>
        </>
    )
}

export default App;