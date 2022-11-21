/** @module CreateTask */

/**
 * @param {() => void} onClick - вызов функции создающей новую задачу
 */

/**
 * @type {React.FC}
 */

export const CreateTask = ({ onClick }) => {
    return <button onClick={onClick}>Создать задачу</button>;
};
export default CreateTask;