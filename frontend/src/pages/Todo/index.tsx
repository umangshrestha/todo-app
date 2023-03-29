import { useState } from "react"
import { useCountTodo, useFindAllTodo } from "../../api/todo";
import { SelectedTab } from "../../component/TodoTable/selectedTab";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TodoTable from "../../component/TodoTable";

export const Todo = () => {
    const [page, setPage] = useState(0);
    const [selectedTab, setSelectedTab] = useState<SelectedTab>(SelectedTab.All);

    return (
        <div>
            <Tabs value={selectedTab} aria-label="todo tabs" onChange={(event, newValue) => setSelectedTab(newValue)}>
                <Tab label="All" value={SelectedTab.All} disabled={selectedTab == SelectedTab.All} />
                <Tab label="Active" value={SelectedTab.Active} disabled={selectedTab == SelectedTab.Active} />
                <Tab label="Completed" value={SelectedTab.Completed} disabled={selectedTab == SelectedTab.Completed} />
            </Tabs>
            <TodoTable selectedTab={selectedTab} />
        </div >
    )
}