import styles from "./globalLoading.module.css";
import { Loading } from "react-vant";

export default function GlobalLoading() {
  return (
    <div className={styles.wrapper}>
      <Loading type="ball" />
    </div>
  );
}