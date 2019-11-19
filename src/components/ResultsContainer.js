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
      backgroundColor: "#222",
      backgroundAttachment: "fixed"
    }
  };
  let bgStyle;

  const numberWithCommas = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
            <h1>{results.title || results.name}</h1>
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
                  starRatedColor="#4fdffc"
                  numberOfStars={10}
                  name="rating"
                  starDimension="20px"
                  starSpacing="1.5px"
                />
              </>
            ) : null}
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
          <h2>Cast</h2>
          <ul>
            {results.credits.cast.map(x => {
              return (
                <li
                  key={x.id}
                  className="credits"
                  onClick={() => props.handler("person", x.id)}
                  tabIndex="0"
                  onKeyDown={e =>
                    e.key === "Enter" ? props.handler("person", x.id) : null
                  }
                >
                  <img
                    src={`http://image.tmdb.org/t/p/w185/${x.profile_path}`}
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
        <div className="related"></div>
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
