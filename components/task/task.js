import Checkbox from "../checkbox/checkbox";
import Data from "../data/data";
import DeleteButton from "../deleteButton/deleteButton";
import {useEffect, useState} from "react";
import styles from './task.module.css'
import dayjs from "dayjs";
import {ref, getDownloadURL} from "firebase/storage"
import {storage} from "../../firebas";

const initialFormData = {
    id: undefined,
    title: '',
    description: '',
    data: dayjs().toString(),
    status: false,
    file: undefined,
}

export const Task = ({task, onDelete, onTaskUpdate}) => {
    const [formData, setFormData] = useState(initialFormData)
    const [file, setFile] = useState()
    const [imgUrl, setImgUrl] = useState('');


    const handleUploadFile = (e) => {
        setFile(e.target.files[0]);
        setFormData((prevState) => {
            return {
                ...prevState, file: e.target.files[0].name
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        onTaskUpdate(formData, file)
    }

    useEffect(() => {
        if (task) {
            setFormData({...task, data: task.data})

        }
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
