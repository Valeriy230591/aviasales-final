import React from "react";
import { useSelector } from "react-redux";
import TransfersFilterItem from "../TransfersFilterItem";
import styles from "./TransfersFilter.module.scss";

const TransfersFilter = () => {
  const filters = useSelector((state) => state.filters.filters);
  const elements = filters.map((filter) => {
    return <TransfersFilterItem key={filter.name} filterProps={filter} />;
  });
  return (
    <div className={styles.filtersWrapper}>
      <h3 className={styles.title}>Количество пересадок</h3>
      <ul className={styles.tickets}>{elements}</ul>
    </div>
  );
};
export default TransfersFilter;
