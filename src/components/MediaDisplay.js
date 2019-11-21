import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import API from "../utils/API";
// let blankPoster = require("../images/blank.svg");
let blankProfile = require("../images/blank-profile.svg");
let blankPoster = require("../images/blank.svg");

function MediaDisplay(props) {
  const [collection, setCollection] = useState([]);
  let results = props.results;
  let style = {
    bg: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundColor: "#222",
      backgroundAttachment: "fixed"
    }
  };

  const findCollection = (id, type) => {
    if (type === "movie") {
      API.getCollection(id)
        .then(res => {
          console.log("collection found");
          setCollection(res.data.parts);
        })
        .catch(err => console.log(err));
    }
  };

  if (results.belongs_to_collection) {
    findCollection(results.belongs_to_collection.id, "movie");
  } else if (!results.belongs_to_collection && collection.length > 0) {
    setCollection([]);
  }

  function toHours(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hour(s) and " + rminutes + " minute(s).";
  }

  const numberWithCommas = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let bgStyle = results.backdrop_path
    ? {
        ...style.bg,
        backgroundImage: `url(http://image.tmdb.org/t/p/original/${results.backdrop_path})`
      }
    : style.bg;

  console.log("target render");
  console.log(results);
  return (
    <div id="resultContainer" style={bgStyle}>
      <div className="resMainInfo">
        <img
          className="featImg"
          src={`http://image.tmdb.org/t/p/w342/${results.poster_path ||
            results.profile_path}`}
          alt=""
        />
        <div className="header">
          <div>
            <h1>{results.title || results.name}</h1>
            <p>
              Released:{" "}
              <span>
                {results.release_date
                  ? results.release_date
                  : results.first_air_date}
              </span>
            </p>
            {results.runtime ? (
              <p>
                Runtime: <span>{toHours(results.runtime)}</span>
              </p>
            ) : null}
          </div>
          {results.vote_average ? (
            <>
              <div className="voteRating">
                <p>
                  {results.vote_average}
                  <span>/10</span>
                </p>
                <p>{numberWithCommas(results.vote_count)} Votes</p>
              </div>
              <StarRatings
                rating={results.vote_average}
                starRatedColor="#37b6fff3"
                numberOfStars={10}
                name="rating"
                starDimension="20px"
                starSpacing="1.5px"
              />
            </>
          ) : null}
          <span className="mainGenreList">
            {results.genres.map(item => {
              return (
                <div key={item.id} className="mainGenre">
                  {item.name}
                </div>
              );
            })}
          </span>
          <p>{results.overview}</p>
        </div>
      </div>
      <div className="aside">
        <h2>Cast</h2>
        <ul id="cast-list">
          {results.credits.cast.map(x => {
            return (
              <li
                // key={x.id}
                className="credits"
                onClick={() => props.handler("person", x.id)}
                tabIndex="0"
                onKeyDown={e =>
                  e.key === "Enter" ? props.handler("person", x.id) : null
                }
              >
                <img
                  src={
                    x.profile_path
                      ? `http://image.tmdb.org/t/p/w185/${x.profile_path}`
                      : blankProfile
                  }
                  alt=""
                />
                <div>
                  <h6>{x.name}</h6>
                  <h6>{x.character}</h6>
                </div>
              </li>
            );
          })}
        </ul>
        {results.credits.crew.length > 0 ? <h2>Crew</h2> : null}
        {results.credits.crew.length > 0 ? (
          <ul id="crew-list">
            {results.credits.crew.map(x => {
              return (
                <li
                  // key={x.id}
                  className="crew"
                  onClick={() => props.handler("person", x.id)}
                  tabIndex="0"
                  onKeyDown={e =>
                    e.key === "Enter" ? props.handler("person", x.id) : null
                  }
                >
                  <img
                    src={
                      x.profile_path
                        ? `http://image.tmdb.org/t/p/w185/${x.profile_path}`
                        : blankProfile
                    }
                    alt=""
                  />
                  <div>
                    <h6>{x.name}</h6>
                    <h6>{x.job}</h6>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <div className="related">
        {collection.length > 0 ? (
          <div className="collection">
            <h2>In this collection:</h2>
            <ul>
              {collection.map(item => {
                return item.title !== results.title ? (
                  <li key={item.id}>
                    <div>
                      <span>{item.title || item.name}</span>
                      {item.vote_average ? (
                        <StarRatings
                          rating={item.vote_average}
                          starRatedColor="#4fdffc"
                          numberOfStars={5}
                          name="rating"
                          starDimension="11px"
                          starSpacing=".5px"
                        />
                      ) : null}
                      <button
                        key={item.id}
                        onClick={() => {
                          props.handler(item.media_type, item.id);
                        }}
                        tabIndex="0"
                        onKeyDown={e =>
                          e.key === "Enter"
                            ? props.handler(item.media_type, item.id)
                            : null
                        }
                      >
                        More
                      </button>
                    </div>
                    <img
                      src={
                        item.poster_path
                          ? `http://image.tmdb.org/t/p/w185/${item.poster_path}`
                          : blankPoster
                      }
                      alt=""
                    />
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MediaDisplay;
