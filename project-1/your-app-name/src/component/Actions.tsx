import React from "react";
import styles from "./Actions.module.scss";
import { Button } from "@mbkit/button";

const Actions = (props:any) => {
  const {onSearchButtonClick} = props;

  return (
    <>
      <div className={styles.third}>
        <p>Actions</p>
        <Button variant="secondary" onClick={() => onSearchButtonClick(true)}>
          Search
        </Button>

        <br />
        <br />
        <Button variant="primary">Download Report</Button>
      </div>
    </>
  );
};

export default Actions;
