import React, {  useState } from "react";
import styles from "./App.module.scss";
import { Label } from "@mbkit/label";
import Pro from "./component/Pro";
import Content from './component/Content';

export const App = () => {
  const [show, setShow] = useState(false);

  const closeContentDiv = () => {
    setShow(false);
  };


  return <>
  <div className={styles.main}>
  <h2 className={styles.head}>No Show/Late Cancel</h2>
  <Label><span className={styles.head2}>Manager Tools</span> <span className={styles.lab}>> No Show/Late Cancel</span></Label> 
  
  <div className={styles.proDiv}>
    <Pro onSearchClick={setShow}></Pro>
    </div>
    {show && <Content onCancel={closeContentDiv}/>}
  </div>
  
    </>
};
export default App;
