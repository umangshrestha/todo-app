import AboutMe from '../pages/aboutme';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import Home from '../pages/home';
import { Todo } from '../component/todo';

export const DrawerItems = [
    { name: "Home", icon: <HomeIcon />, link: "/", element: <Home /> },
    { name: "Todo", icon: <ListIcon />, link: "/todo", element: <Todo /> },
    { name: "About", icon: <InfoIcon />, link: "/about", element: <AboutMe /> },
]