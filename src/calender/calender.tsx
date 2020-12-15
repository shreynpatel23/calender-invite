import React, { useEffect } from "react";
import "./calender.css";
import moment from "moment";
import renderCalender from "./renderCalender";
import arrowImage from "../assets/images/arrow.png";

function Calender() {
  const weeksHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [calender, setCalender] = React.useState([]);
  const [todaysDate, setTodaysDate] = React.useState(moment());
  const [renderCount, setRenderCount] = React.useState(0);

  useEffect(() => {
    setCalender(renderCalender(todaysDate));
  }, [todaysDate, renderCount]);

  function isToday(day) {
    return todaysDate.isSame(day, "day");
  }

  function currentMonth() {
    return todaysDate.format("MMMM");
  }

  function currentYear() {
    return todaysDate.format("YYYY");
  }

  function prevMonth() {
    return todaysDate.clone().subtract(1, "month");
  }

  function nextMonth() {
    return todaysDate.clone().add(1, "month");
  }

  function throttleScrol(date) {
    let isScrolling;
    window.clearTimeout(isScrolling);
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function () {
      // Run the callback
      setTodaysDate(date);
      setRenderCount(renderCount + 1);
    }, 650);
  }

  return (
    <div className="container calenderContainer">
      <div className="d-flex align-items-center card-header header-height">
        <div className="flex-grow-1 px-4">
          {currentMonth()} - {currentYear()}
        </div>
        <div
          className="ml-auto arrowButtonWrapper d-flex align-items-center justify-content-center"
          onClick={() => setTodaysDate(prevMonth())}
        >
          <img src={arrowImage} alt="arrow" className="previousArrow" />
        </div>
        <button className="btn" onClick={() => setTodaysDate(moment())}>
          Today
        </button>
        <div
          className="arrowButtonWrapper d-flex align-items-center justify-content-center"
          onClick={() => setTodaysDate(nextMonth())}
        >
          <img src={arrowImage} alt="arrow" className="nextArrow" />
        </div>
      </div>
      <div className="calender py-4">
        {weeksHeader.map((header) => (
          <p className="mb-0 text-center" key={header}>
            {header}
          </p>
        ))}
      </div>
      <div
        className="body-height"
        onWheel={(event: any) => {
          if (event.nativeEvent.wheelDelta > 0) {
            throttleScrol(prevMonth());
          } else {
            throttleScrol(nextMonth());
          }
        }}
      >
        {calender.map((week, index: number) => (
          <div key={index} className="calender">
            {week.map((day, index: number) => (
              <div
                key={index}
                className="cell d-flex justify-content-end"
                onClick={() => setTodaysDate(day)}
              >
                <p className={`mb-0 ${isToday(day) ? "todaysDate" : "date"}`}>
                  {day.format("D").toString()}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calender;
