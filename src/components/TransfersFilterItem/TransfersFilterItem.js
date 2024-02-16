import React from "react";
import { useDispatch } from "react-redux";
import { setActiveFilter } from "../../redux/slices/filterSlice";
import styles from "./TransfersFilterItem.module.scss";

const TransfersFilterItem = ({ filterProps }) => {
  const { name, label, active } = filterProps;

  const dispatch = useDispatch();
  const handleActiveFilterChange = (name) => {
    dispatch(setActiveFilter(name));
  };
  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={active}
        onChange={() => handleActiveFilterChange(name)}
      />
      <label htmlFor={name}>{label}</label>
    </li>
  );
};
export default TransfersFilterItem;
