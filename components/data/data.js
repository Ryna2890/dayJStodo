/** @module Data */

/**
 * @param {string} data - дата завершения задачи
 * @param {(event) => void} onChange - колбек при изменении даты пользователем
 */

/**
 * @type {React.FC}
 */
export const Data = ({ data,onChange }) => {

  return (
    <input
      type="date"
      value={data}
      min="2022-11-18"
      max="2050-12-31"
      onChange={onChange}
    ></input>
  );
};
export default Data;
