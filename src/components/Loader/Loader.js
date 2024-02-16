import BarLoader from "react-spinners/BarLoader";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.title}>
      <BarLoader
        color="#2196f3"
        width={500}
        height={10}
        speedMultiplier={0.3}
      />
    </div>
  );
};

export default Loader;
