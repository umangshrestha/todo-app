import AboutMe from './AboutMe';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import Home from './Home';
import { Todo } from './Todo';
import Trash from './Trash';

export const routes = [
    {
        name: "Home",
        icon: <HomeIcon />,
        link: "/",
        element: <Home />
    }, {
        name: "Todo",
        icon: <ListIcon />,
        link: "/todo",
        element: <Todo />
    }, {
        name: "About",
        icon: <InfoIcon />,
        link: "/about",
        element: <AboutMe />
    }, {
        name: "Trash",
        icon: <DeleteIcon />,
        link: "/trash",
        element: <Trash />,

    }
]