/** @module Checkbox */

/**
 * @param {() => void} onClick - колбек при изменении состояния чекбокса
 * @param {boolean} isChecked - актуальное состояние чекбокса
 */

/**
 * @type {React.FC}
 */

export const Checkbox=({ isChecked,onChange})=>{
    return(
        <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
        ></input>
    )
}
export default Checkbox