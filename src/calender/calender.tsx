import React, { useEffect } from "react";
import "./calender.css";
import moment from "moment";
import renderCalender from "./renderCalender";
import arrowImage from "../assets/images/arrow.png";
import getAllInvites from "../api/getAllInvites";
import Tile from "./tile/tile";

function Calender() {
  const weeksHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [calender, setCalender] = React.useState([]);
  const [todaysDate, setTodaysDate] = React.useState(moment());
  const [renderCount, setRenderCount] = React.useState(0);
  const [toggleTileView, setToggleTileView] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState({});
  const [posts, setPosts] = React.useState([
    {
      date: "",
      images: [],
      rating: 0,
      text: "",
      typeOfDay: [],
    },
  ]);

  useEffect(() => {
    async function getAllPosts() {
      try {
        await getAllInvites(40)
          .then((res: any) => {
            res.data.ResponseObjects.map((data) => {
              const { Posts } = data;
              const arr = [];
              Posts.map((post) => {
                const {
                  CalendarDateTime,
                  Images,
                  Rating,
                  Text,
                  TypeOfDay,
                } = post;
                arr.push({
                  date: moment(CalendarDateTime).format("Do MMM YYYY"),
                  images: Images,
                  rating: Rating,
                  text: Text,
                  typeOfDay: TypeOfDay,
                });
                return arr;
              });
              const removeDuplicateDates = arr.filter(
                (value, index, array) =>
                  array.findIndex((arr) => arr.date === value.date) === index
              );
              return setPosts(removeDuplicateDates);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }

    getAllPosts();
  }, []);

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
    }, 800);
  }

  function getLegendStyle(legend) {
    if (legend === "Protein Treatment") return "rgb(221,235,241)";
    if (legend === "Hair Color") return "rgb(244,223,235)";
    if (legend === "Hair Cut") return "rgb(244,223,235)";
    if (legend === "Deep Conditioning") return "rgb(221,237,234)";
    if (legend === "Clarifying") return "rgb(251,228,228)";
  }

  function getLegendInitials(legend) {
    if (legend === "Protein Treatment") return "Pr";
    if (legend === "Hair Color") return "HC";
    if (legend === "Hair Cut") return "Cu";
    if (legend === "Deep Conditioning") return "DC";
    if (legend === "Clarifying") return "C";
  }

  return (
    <div>
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
          <button
            className="mx-2 btn btn-light"
            onClick={() => setTodaysDate(moment())}
          >
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
                  className="cell"
                  onClick={() => setTodaysDate(day)}
                >
                  <p className={`mb-0 ${isToday(day) ? "todaysDate" : "date"}`}>
                    {day.format("D").toString()}
                  </p>
                  {posts?.map((post, i: number) => {
                    if (post.date.includes(day.format("Do MMM YYYY"))) {
                      return (
                        <div
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPost(post);
                            setToggleTileView(true);
                          }}
                        >
                          <div className="py-2 d-flex">
                            {post.typeOfDay.map((legend, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className="legend mr-1 d-flex align-items-center justify-content-center"
                                  style={{ background: getLegendStyle(legend) }}
                                >
                                  <p className="mb-0 legendText">
                                    {getLegendInitials(legend)}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <div
                            style={{ width: "100%", height: "83px" }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <img
                              src={post.images[0].ImageUrl}
                              alt="thumbnail_image"
                              style={{ height: "100%" }}
                            />
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {toggleTileView ? (
        <Tile
          posts={posts}
          click={() => setToggleTileView(false)}
          selectedPost={selectedPost}
        />
      ) : null}
    </div>
  );
}

export default Calender;
