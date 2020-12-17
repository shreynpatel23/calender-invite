import React, { useEffect, useRef } from "react";
import arrowImage from "../../assets/images/arrow.png";
import filledStar from "../../assets/images/filledStar.png";
import star from "../../assets/images/star.png";
import "./tile.css";

function Tile({ posts, click, selectedPost }: any) {
  const currentIndex = posts.findIndex((post) => post === selectedPost);
  const [activePostIndex, setActivePostIndex] = React.useState(currentIndex);
  const postRef = useRef([]);
  useEffect(() => {
    postRef.current[activePostIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  }, [activePostIndex]);
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

  function renderRating(post) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < post.rating) {
        stars.push(
          <div className="px-1" id={`id${i}`} key={i}>
            <img src={filledStar} alt="filledStar" height="10px" />
          </div>
        );
      } else {
        stars.push(
          <div className="px-1" id={`id${i}`} key={i}>
            <img src={star} alt="star" height="10px" />
          </div>
        );
      }
    }
    return stars;
  }

  return (
    <div className="overlay d-flex align-items-center justify-content-center">
      <div className="close" onClick={() => click()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 25.468 25.471"
        >
          <path
            id="Union_10"
            d="M9580.667 18462.982a3.675 3.675 0 0 1 0-5.2l6.457-6.455-6.457-6.455a3.68 3.68 0 0 1 5.2-5.205l6.456 6.459 6.454-6.453a3.676 3.676 0 0 1 5.2 5.2l-6.454 6.453 6.454 6.457a3.676 3.676 0 0 1-5.2 5.2l-6.456-6.455-6.454 6.455a3.674 3.674 0 0 1-5.2 0z"
            data-name="Union 10"
            transform="translate(-9579.59 -18438.592)"
          />
        </svg>
      </div>
      <div className="cardWrapper d-flex">
        {activePostIndex !== 0 ? (
          <div
            className="px-3 prev"
            onClick={() => setActivePostIndex(activePostIndex - 1)}
          >
            <div className="arrowButtonWrapper d-flex align-items-center justify-content-center">
              <img src={arrowImage} alt="arrow" className="previousArrow" />
            </div>
          </div>
        ) : null}
        <div className="px-5 d-flex">
          {posts.map((post, index) => {
            return (
              <div
                className="card m-2"
                style={
                  activePostIndex === index
                    ? {
                        transform: "scale(1.05)",
                        width: "300px",
                        zIndex: 2,
                        transition: "scale 0.2s",
                      }
                    : {
                        transform: "scale(0.95)",
                        width: "300px",
                        transition: "scale 0.2s",
                      }
                }
                key={index}
                ref={(post) => (postRef.current[index] = post)}
              >
                <div style={{ height: "200px" }}>
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={post.images[0].ImageUrl}
                    alt="thumbnail_image"
                  />
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center py-2">
                    {post.typeOfDay.map((legend, index: number) => {
                      return (
                        <div
                          key={index}
                          className="Cardlegend mr-1 d-flex align-items-center justify-content-center"
                          style={{ background: getLegendStyle(legend) }}
                        >
                          <p className="mb-0 legendText">
                            {getLegendInitials(legend)}
                          </p>
                        </div>
                      );
                    })}
                    <div className="px-2 d-flex align-items-center ml-auto">
                      {renderRating(post)}
                    </div>
                  </div>
                  <div className="py-2">
                    <p className="mb-0 card-title font-weight-bold">
                      {post.date}
                    </p>
                  </div>
                  <p className="card-text" style={{ fontSize: "12px" }}>
                    {post.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {activePostIndex !== posts.length - 1 && (
          <div
            className="px-3 next"
            onClick={() => setActivePostIndex(activePostIndex + 1)}
          >
            <div className="arrowButtonWrapper d-flex align-items-center justify-content-center">
              <img src={arrowImage} alt="arrow" className="nextArrow" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tile;
