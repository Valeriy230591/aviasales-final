import React from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/slices/tabSlice";

import styles from "./TabsItem.module.scss";

const TabsItem = ({ tabprops }) => {
  const dispatch = useDispatch();
  const handleActiveTab = (name) => dispatch(setActiveTab(name));
  const { label, active, name } = tabprops;

  return (
    <button
      type="button"
      id={name}
      name={name}
      className={active ? `${styles.item} ${styles.item_active}` : styles.item}
      onClick={() => handleActiveTab(name)}
    >
      {label}
    </button>
  );
};
export default TabsItem;
