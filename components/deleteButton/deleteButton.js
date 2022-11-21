/** @module DeleteButton */

/**
 * @param {() => void} onClick - колбек при нажатии на кнопку, для удаления задачи
 */

/**
 * @type {React.FC}
 */

export const DeleteButton=({onClick})=>{
    return(
        <button onClick={onClick}>X</button>
    )
}
export default DeleteButton