import React, { Component, useState } from "react";
import styles from "./Filter.module.scss";
import { Label } from "@mbkit/label";
import { Checkbox } from "@mbkit/checkbox";
// import { MultiSelect } from "@mbkit/select";
import { MultiSelect, MultiSelectOption } from "./MultiSelect/MultiSelect";

const Filters = () => {
  const options1: MultiSelectOption[] = [
    { label: "Select All", checked: false, id: "test1" },
    { label: "Appointments", checked: false, id: "test2" },
    { label: "Class & Event Reservation", checked: false, id: "test3" },
  ];
  const [state, setState] = useState(options1);

  const options2: MultiSelectOption[] = [
    { label: "Select All", checked: false, id: "test1" },
    { label: "Memberships Type 1", checked: false, id: "test2" },
    { label: "Memberships Type 2", checked: false, id: "test3" },
    { label: "Type 1", checked: false, id: "test4" },
    { label: "Type 2", checked: false, id: "test5" },
  ];
  const [state2, setState2] = useState(options2);

  const options3: MultiSelectOption[] = [
    { label: "Select All", checked: false, id: "test1" },
    { label: "Late Cancellation (Charged)", checked: false, id: "test2" },
    { label: "No Show (Charged)", checked: false, id: "test3" },
  ];
  const [state3, setState3] = useState(options3);
  
  let f:boolean = false;
const handler =() =>{
   f = true;
}
  return (
    <>
      <div className={styles.second}>
        <p>Filters</p>
        <MultiSelect
          label="Type of Service"
          options={state}
          onChange={setState}
        />
        <br />
        <MultiSelect
          label="Select Pricing Options"
          useSearchInput
          options={state2}
          onChange={setState2}
        />
        <br />
        <MultiSelect
          label="Cancellation Method"
          options={state3}
          onChange={setState3}
        ></MultiSelect>
        <br />
        <Checkbox onChange={handler} checked={f} /> Only show clients
        whose credit cards are listed.
      </div>
    </>
  );
};

export default Filters;
