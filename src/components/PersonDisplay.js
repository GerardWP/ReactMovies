import React from "react";
import StarRatings from "react-star-ratings";

let blankProfile = require("../images/blank-profile.svg");
let blankPoster = require("../images/blank.svg");
let mainbg = require("../images/person-bg2.jpg");

function PersonDisplay(props) {
  let results = props.results;
  let style = {
    bg: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top"
    }
  };

  let bgStyle = {
    bg: {
      background: `url(${mainbg}) center top no-repeat #222`,
      backgroundSize: "cover"
    }
  };

  return (
    <div id="resultContainer" style={bgStyle.bg}>
      <div className="resMainInfo resTwo">
        <img
          className="featImg"
          src={
            `http://image.tmdb.org/t/p/w342/${results.profile_path}` ||
            blankProfile
          }
          alt=""
        />
        <div className="header">
          <div>
            <h1>{results.name}</h1>
            <p>
              Known for: <span>{results.known_for_department}</span>
            </p>
            {results.place_of_birth ? (
              <p>
                Place of Birth: <span>{results.place_of_birth}</span>
              </p>
            ) : null}
          </div>
          <p>
            Birthday: <span>{results.birthday}</span>
          </p>
          <p>{results.biography}</p>
        </div>
      </div>
      <div className="aside"></div>
      <div className="related relTwo">
        {results.combined_credits.cast ? (
          <div className="collection personSect">
            <h2>As Cast</h2>
            <ul>
              {results.combined_credits.cast.map(item => {
                return (
                  <li
                    key={item.id}
                    style={
                      item.poster_path
                        ? {
                            ...style.bg,
                            backgroundImage: `url(http://image.tmdb.org/t/p/original/${item.poster_path})`
                          }
                        : {
                            ...style.bg,
                            backgroundImage: `url(${blankPoster})`
                          }
                    }
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
                    <div>
                      <div className="collectionDiv persDiv">
                        <span>{item.title || item.name}</span>
                        {item.vote_average ? (
                          <StarRatings
                            rating={item.vote_average}
                            starRatedColor="#37b6fff3"
                            numberOfStars={5}
                            name="rating"
                            starDimension="11px"
                            starSpacing=".5px"
                          />
                        ) : null}
                        {item.character ? (
                          <p>
                            <span>Character:</span> {item.character}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        {results.combined_credits.crew ? (
          <div className="collection personSect">
            <h2>As Crew</h2>
            <ul>
              {results.combined_credits.crew.map(item => {
                return (
                  <li
                    key={item.id}
                    style={
                      item.poster_path
                        ? {
                            ...style.bg,
                            backgroundImage: `url(http://image.tmdb.org/t/p/original/${item.poster_path})`
                          }
                        : {
                            ...style.bg,
                            backgroundImage: `url(${blankPoster})`
                          }
                    }
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
                    <div>
                      <div className="collectionDiv persDiv">
                        <span>{item.title || item.name}</span>
                        {item.vote_average ? (
                          <StarRatings
                            rating={item.vote_average}
                            starRatedColor="#37b6fff3"
                            numberOfStars={5}
                            name="rating"
                            starDimension="11px"
                            starSpacing=".5px"
                          />
                        ) : null}
                        {item.job ? (
                          <p>
                            <span>Role:</span> {item.job}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PersonDisplay;
