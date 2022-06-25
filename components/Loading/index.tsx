import styles from "./style.module.scss";
import { Spin } from "antd";
import { LoadingProps } from "../../types/app";

const Loading = ({ load }: LoadingProps) => {
  return (
    <div className={styles.loading}>
      {load === true ? <Spin size="large" /> : null}
    </div>
  );
};

export default Loading;
