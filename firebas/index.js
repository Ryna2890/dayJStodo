// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage, ref, uploadBytes, deleteObject} from "firebase/storage"
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc} from 'firebase/firestore/lite';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnD4IgTKz4Nq1RrW7QC9n2l6EAcv4B8ZU",
    authDomain: "todo-fad25.firebaseapp.com",
    projectId: "todo-fad25",
    storageBucket: "todo-fad25.appspot.com",
    messagingSenderId: "322440283024",
    appId: "1:322440283024:web:a416df28e4262ad24d6915"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)


export async function getTaskList() {
    const todoCol = collection(db, 'todos');
    const todoSnapshot = await getDocs(todoCol);

    return todoSnapshot.docs.map(el => {
        const id = el.id;
        const data = el.data();
        return {id, ...data}
    })
}

export async function addTask(task) {
    await addDoc(collection(db, "todos"), task)
}

export const deleteTodo = async (docId, filename) => {
    try {
        await deleteDoc(doc(db, "todos", docId));
        await deleteObject(ref(storage, `files/${filename}`))

    } catch (err) {
        console.log(err);
    }
};

export const updateTaskApi = async (task, file) => {
    try {
        console.log('updateTask', task)
        const imagesRef = ref(storage, `files/${task.file}`);
        uploadBytes(imagesRef, file).then((snapshot) => {
            console.log(snapshot);
        });

        const {id, ...rest} = task
        await updateDoc(doc(db, "todos", id), {
            ...rest
        }, {merge: true});
    } catch (err) {
        console.log(err);
    }
};
















