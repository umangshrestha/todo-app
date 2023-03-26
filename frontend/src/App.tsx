import React, { useEffect, useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { useQuery } from '@tanstack/react-query';
import { CountTodo } from '../wailsjs/go/main/App';

function App() {
    const [value, setValue] = useState({});
    useEffect(() => {
        CountTodo().then(x => setValue(x))
    })
    return (<div>{JSON.stringify(value)}</div>)
}

export default App
