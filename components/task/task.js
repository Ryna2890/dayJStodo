import Checkbox from "../checkbox/checkbox";
import Data from "../data/data";
import DeleteButton from "../deleteButton/deleteButton";
import {useEffect, useState} from "react";
import styles from './task.module.css'
import dayjs from "dayjs";
import {ref, getDownloadURL} from "firebase/storage"
import {storage} from "../../firebas";


/** @constant
 @type {Object}
 @type {undefined} initialFormData.id
 @type {string} initialFormData.title
 @type {string} initialFormData.description
 @type {string} initialFormData.data
 @type {boolean} initialFormData.status
 @type {undefined} initialFormData.file
 @default
 */
const initialFormData = {
    id: undefined,
    title: '',
    description: '',
    data: dayjs().toString(),
    status: false,
    file: undefined,
}

/** @module Task */

/**
 * @param {Object} task - получение объекта с полями задачи
 * @param {string} task.id
 * @param {string} task.title
 * @param {string} task.description
 * @param {string} task.data
 * @param {boolean} task.status
 * @param {string} task.file
 * @param {() => void} onDelete - колбек функции удаления задачи
 * @param {() => void} onTaskUpdate - колбек функции обновления задачи на беке
 */

/**
 * @type {React.FC}
 */
export const Task = ({task, onDelete, onTaskUpdate}) => {
    /**
     @type {[{},function]} formData
     */
     /**
     @type {function} setFormData
     @param {{}}
     @return {{}}
     */

    /**
     * @template T
     * @typedef {[T, import('react').Dispatch<import('react').SetStateAction<T>>]} useState
     */

    /** @type {useState<Object>} */
    const [formData, setFormData] = useState(initialFormData)
    /**
     @type {[{},function]} formData
     */
    /**
     @type {function} setFormData
     @param {{}}
     @return {{}}
     */

    /** @type {useState<Object>} */
    const [file, setFile] = useState({})
    /**
     @type {[string,function]} imgUrl
     */
    /**
     @type {function} setImgUrl
     @param {string}
     @return {string}
     */

    /** @type {useState<string>} */
    const [imgUrl, setImgUrl] = useState('');

    /** @constant
     @type {function} handleUploadFile
     @property {event} e
     @returns void

     */

    const handleUploadFile = (e) => {
        setFile(e.target.files[0]);
        setFormData((prevState) => {
            return {
                ...prevState, file: e.target.files[0].name
            }
        })
    }

    /** @constant
     @type {function} handleSubmit
     @property {event} e
     @returns void
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        onTaskUpdate(formData, file)
    }

    useEffect(() => {

        /**
         * Method comment
         *
         * @param {Object} task - получение задачи
         */
        if (task) {
            setFormData({...task, data: task.data})

        }
        /**
         * Method comment
         *
         * @param {string} task.file - получение ссыылки на скаччивание загруженного в задачу файла
         */
        if (task.file) {
            getDownloadURL(ref(storage, `/files/${task.file}`)).then((res) => setImgUrl(res))
        }
    }, [task])

    return (
        <div className={styles.task}>

            <div style={dayjs().isAfter(dayjs(formData.data, 'day')) ? {background: 'red'} : {background: 'blue'}}>
                <form onSubmit={(e) => handleSubmit(e, task)}>
                    <Checkbox isChecked={formData.status} onChange={() => setFormData((prevState) => {
                        return {
                            ...prevState,
                            status: !prevState.status
                        }
                    })}/>

                    <Data data={formData.data} onChange={(e) => setFormData((prevState) => {
                        return {
                            ...prevState,
                            data: e.target.value
                        }
                    })}/>
                    <textarea
                        placeholder="Введите название"
                        value={formData.title}
                        onChange={(e) => setFormData((prevState) => {
                            return {
                                ...prevState, title: e.target.value
                            }
                        })}
                    ></textarea>
                    <textarea
                        placeholder="Введите текст"
                        value={formData.description}
                        onChange={(e) => setFormData((prevState) => {
                            return {
                                ...prevState, description: e.target.value
                            }
                        })}
                    ></textarea>
                    {!!task.file ? <a download={formData.file} href={`${imgUrl}`}><img src={`${imgUrl}`}
                                                                                       alt={formData.file}/></a> :
                        <label>
                            Upload file:
                            <input type="file"
                                   onChange={(e) => handleUploadFile(e)}
                            />
                        </label>}
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            <DeleteButton onClick={() => onDelete(task)}/>
        </div>
    );
};
export default Task;
