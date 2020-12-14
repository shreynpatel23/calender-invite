import React, { useEffect } from "react";
import "./calender.css";
import moment from "moment";
import renderCalender from "./renderCalender";

function Calender() {
  const weeksHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [calender, setCalender] = React.useState([]);
  const [todaysDate, setTodaysDate] = React.useState(moment());

  useEffect(() => {
    setCalender(renderCalender(todaysDate));
  }, [todaysDate]);

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

  return (
    <div className="container calenderContainer">
      <div className="card">
        <div className="py-4 d-flex align-items-center card-header">
          <div className="px-4">
            <p
              className="mb-0"
              style={{ cursor: "pointer" }}
              onClick={() => setTodaysDate(prevMonth())}
            >
              Prev
            </p>
          </div>
          <div className="flex-grow-1 text-center px-4">
            {currentMonth()} - {currentYear()}
          </div>
          <div className="px-4">
            <p
              className="mb-0"
              style={{ cursor: "pointer" }}
              onClick={() => setTodaysDate(nextMonth())}
            >
              Next
            </p>
          </div>
        </div>
        <div className="card-body">
          <div className="calender py-4">
            {weeksHeader.map((header) => (
              <p className="mb-0 text-center" key={header}>
                {header}
              </p>
            ))}
          </div>
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
    </div>
  );
}

export default Calender;
