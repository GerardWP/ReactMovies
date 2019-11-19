import React from "react";
import SearchDisplay from "./SearchDisplay";
import StarRatings from "react-star-ratings";

function ResultsContainer(props) {
  let results = props.resRender.results;
  let style = {
    bg: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      backgroundColor: "#222"
    }
  };
  let bgStyle;

  if (props.resRender.type === "target") {
    results = results[0];
    let genreKnown = results.genres || results.known_for;
    results.backdrop_path
      ? (bgStyle = {
          ...style.bg,
          backgroundImage: `url(http://image.tmdb.org/t/p/original/${results.backdrop_path})`
        })
      : (bgStyle = style.bg);
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
            {results.vote_average ? (
              <StarRatings
                rating={results.vote_average}
                starRatedColor="#4fdffc"
                numberOfStars={10}
                name="rating"
                starDimension="20px"
                starSpacing="1.5px"
              />
            ) : null}
            <h1>{results.title || results.name}</h1>
            <span className="mainGenreList">
              {genreKnown.map(item => {
                if (results.genres) {
                  return (
                    <div key={item.id} className="mainGenre">
                      {item.name}
                    </div>
                  );
                } else return null;
              })}
            </span>
            <p>{results.overview}</p>
          </div>
        </div>
        <div className="aside">
          <ul>
            {results.credits.cast.map(x => {
              return (
                <li className="credits">
                  <img
                    src={`http://image.tmdb.org/t/p/w45/${x.profile_path}`}
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
        </div>
      </div>
    );
  } else {
    return (
      <SearchDisplay
        findGenre={props.findGenre}
        results={results}
        handler={props.handler}
        genres={props.genres}
      />
    );
  }
}

export default ResultsContainer;
