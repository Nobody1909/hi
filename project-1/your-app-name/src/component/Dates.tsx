import React, { useState } from "react";
import styles from "./Dates.module.scss";
import { Input } from "@mbkit/input";
import { Label } from "@mbkit/label";
import { Calendar } from "@mbkit/calendar";
import dateFormat from "dateformat";
import { makeStyles } from "@material-ui/core/styles";
import { ClickAwayListener } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
    zIndex: theme.zIndex.drawer + 1,
  },
}));
const Dates = () => {
  let today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState(false);
  const classes = useStyles();

  const openStartDateCalendarHandler = () => {
    setShowStartDateCalendar(true);
  };

  const openEndDateCalendarHandler = () => {
    setShowEndDateCalendar(true);
  };

  const closeStartDateCalendarHandler = () => {
    setShowStartDateCalendar(false);
  };

  const closeEndDateCalendarHandler = () => {
    setShowEndDateCalendar(false);
  };

  const startDateHandler = (e:Date) => {
    //console.log(e);
    setStartDate(e);
    setShowStartDateCalendar(false);
  };

  const endDateHandler = (e:Date) => {
    //console.log(e);
    setEndDate(e);
    setShowEndDateCalendar(false);
  };

  return (
    <>
      <div className={styles.first}>
        <p>Dates</p>
        <>
          <ClickAwayListener onClickAway={closeStartDateCalendarHandler}>
            <Label htmlFor="name" id="name-label">
              Start Date
              <Input
                type="text"
                value={dateFormat(startDate, "d/m/yyyy")}
                onChange={() => {}}
                onClick={openStartDateCalendarHandler}
              />
              {showStartDateCalendar && (
                <Calendar
                  className={styles.SDCalenderPopup}
                  onChange={(date:any) => startDateHandler(date)}
                  minDetail="year"
                />
              )}
            </Label>
          </ClickAwayListener>
        </>

        <br />
        <>
          <ClickAwayListener onClickAway={closeEndDateCalendarHandler}>
            <Label htmlFor="name" id="name-label">
              End Date
              <Input
                type="text"
                value={dateFormat(endDate, "d/m/yyyy")}
                onChange={() => {}}
                onClick={openEndDateCalendarHandler}
              />
              {showEndDateCalendar && (
                <Calendar
                  className={styles.EDCalenderPopup}
                  onChange={(date:any) => endDateHandler(date)}
                  minDetail="year"
                  minDate={startDate}
                />
              )}
            </Label>
          </ClickAwayListener>
        </>
      </div>
    </>
  );
};

export default Dates;
