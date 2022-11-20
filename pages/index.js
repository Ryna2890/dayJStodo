import {useCallback, useEffect, useMemo, useState} from "react";
import {
    addTask,
    deleteTodo,
    getTaskList,
    updateTaskApi
} from "../firebas";
import CreateTask from "../components/createTask/createTask";
import dayjs from "dayjs";
import Task from "../components/task/task";


export default function Home() {
    const [tasks, setTasks] = useState([])
    const [updatedTask, setUpdatedTask] = useState(dayjs().valueOf())

    const handlerCreateTask = async () => {
        const newTask = {title: '', description: '', status: false, data: dayjs().format('YYYY-MM-DD'), file: ''}
        addTask(newTask).catch((error) => console.error(error));
        getTaskList().then(res => setTasks(res))

    }

    const deleteTask = useCallback((task) => {
        deleteTodo(task.id, task.file).catch((error) => console.error(error));
        getTaskList().then(res => setTasks(res))
    }, [setTasks])


    const updateTask = useCallback((task, file) => {
        updateTaskApi(task, file)
            .then(res => {
                setUpdatedTask(dayjs().valueOf())
            })
            .catch((error) => console.error(error));
    }, [])


    const unCompletedTasks = useMemo(() => {
        if (!tasks) {
            return [];
        }
        const taskList = tasks.filter((task) => !task.status);

        return taskList.map((item) => (
            <Task key={item.id} task={item} onDelete={deleteTask} onTaskUpdate={updateTask}/>));
    }, [tasks])

    const completedTasks = useMemo(() => {
        if (!tasks) {
            return [];
        }
        const taskList = tasks.filter((task) => task.status);

        return taskList.map((item) => (
            <Task key={item.id} task={item} onDelete={deleteTask} onTaskUpdate={updateTask}/>));
    }, [tasks])


    useEffect(() => {
        getTaskList().then(res => setTasks(res))
    }, [])

    useEffect(() => {
        getTaskList().then(res => setTasks(res))
    }, [updatedTask])

    return (
        <div className="layout_body">
            <CreateTask onClick={handlerCreateTask}/>
            <div className="layout__list">

                <div className="layout__list_do">
                    <h1>Do</h1>
                    <div className="layout__list_do_task">
                        {unCompletedTasks}
                    </div>
                </div>
                <div className="layout__list_done">
                    <h1>Done</h1>
                    <div className="layout__list_done_task">
                        {completedTasks}
                    </div>
                </div>
            </div>
        </div>
    )
}
