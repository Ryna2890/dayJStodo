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

/**
 * @type {React.FC}
 */
export default function Home() {

    /**
     @type {Object[]} tasks
     */
    /**
     @type {function} setTasks
     @param {Object[]}
     @return {Object[]}
     */
    /**
     * @template T
     * @typedef {[T, import('react').Dispatch<import('react').SetStateAction<T>>]} useState
     */

    /** @type {useState<Object[]>} */

    const [tasks, setTasks] = useState([])

    /**
     @type {string} updatedTask
     */
    /**
     @type {function} setUpdatedTask
     @param {string}
     @return {string}
     */
    /** @type {useState<string>} */
    const [updatedTask, setUpdatedTask] = useState(dayjs().valueOf())

    /** @constant
     @type {function} handlerCreateTask
     @returns void - создание новой пустой задачи, обновление данных на беке

     */
    const handlerCreateTask = async () => {
        const newTask = {title: '', description: '', status: false, data: dayjs().format('YYYY-MM-DD'), file: ''}
        addTask(newTask).then((res)=> setUpdatedTask(dayjs().valueOf()))

    }

    /** @constant
     @type {function} handlerCreateTask
     @property {Object} task
     @returns void - удаление задачи из базы данных

     */

    const deleteTask = useCallback((task) => {
        deleteTodo(task.id, task.file).then((res)=> setUpdatedTask(dayjs().valueOf()))
    }, [setTasks])

    /** @constant
     @type {function} handlerCreateTask
     @property {Object} task
     @property {string} file
     @returns void - обновление данных в задаче на беке

     */

    const updateTask = useCallback((task, file) => {
        updateTaskApi(task, file)
            .then(res => {
                setUpdatedTask(dayjs().valueOf())
            })
            .catch((error) => console.error(error));
    }, [])


    /** @constant
     @type {function} unCompletedTasks
     @returns void - фильтр задач по статусу(state:false)

     */
    const unCompletedTasks = useMemo(() => {
        if (!tasks) {
            return [];
        }
        const taskList = tasks.filter((task) => !task.status);

        return taskList.map((item) => (
            <Task key={item.id} task={item} onDelete={deleteTask} onTaskUpdate={updateTask}/>));
    }, [tasks])

    /** @constant
     @type {function} completedTasks
     @returns void - фильтр задач по статусу(state:true)

     */

    const completedTasks = useMemo(() => {
        if (!tasks) {
            return [];
        }
        const taskList = tasks.filter((task) => task.status);

        return taskList.map((item) => (
            <Task key={item.id} task={item} onDelete={deleteTask} onTaskUpdate={updateTask}/>));
    }, [tasks])


    useEffect(() => {
        /**
         * Method comment
         *
         * @param {Object} task - получение массива задач с бека, при рендере
         */

        getTaskList().then(res => setTasks(res))
    }, [])

    useEffect(() => {
        /**
         * Method comment
         *
         * @param {Object} task - получение массива задач с бека, если данные обновились
         */

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
