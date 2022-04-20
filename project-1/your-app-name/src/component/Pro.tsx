import styles from "./Pro.module.scss";
import React from "react";

import Dates from "./Dates";
import Filters from "./Filters";
import Actions from "./Actions";
const Pro = (props:any) => {
  const { onSearchClick } =props;

  return <div className={styles.wrapper}>
      <Dates />
      <div className={styles.separator}></div>
      <Filters />
      <div className={styles.separator}></div>
      <Actions onSearchButtonClick={onSearchClick} />
    </div>
    

};

export default Pro;
