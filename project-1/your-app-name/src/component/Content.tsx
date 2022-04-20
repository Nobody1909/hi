import React from "react";
import styles from "./Content.module.scss";

const Content = (props:any) => {
  return (
    <div className={styles.main2} onClick={props.onCancel}>
      <p>Content</p>
    </div>
  );
};

export default Content;
