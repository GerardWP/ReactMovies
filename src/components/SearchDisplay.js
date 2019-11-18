import React from "react";
import StarRatings from "react-star-ratings";
let blankPoster = require("../images/blank.svg");

function SearchDisplay(props) {
  const results = props.results;

  return (
    <div id="relatedRes">
      {results.map(res => {
        const genres =
          res.media_type === "movie"
            ? props.genres.movie
            : props.genres.tv
            ? props.genres.tv
            : null;
        return (
          <div key={res.id} className="resBox">
            <div className="imgLinks">
              <img
                src={
                  res.poster_path
                    ? `http://image.tmdb.org/t/p/w185/${res.poster_path}`
                    : res.profile_path
                    ? `http://image.tmdb.org/t/p/w185/${res.profile_path}`
                    : blankPoster
                }
                alt={res.title || res.name}
              />
            </div>
            <div className="searchInfo">
              <h1>{res.media_type === "movie" ? res.title : res.name}</h1>
              {res.vote_average ? (
                <StarRatings
                  rating={res.vote_average}
                  starRatedColor="#4fdffc"
                  numberOfStars={10}
                  name="rating"
                  starDimension="15px"
                  starSpacing="1px"
                />
              ) : null}
              {res.release_date ? (
                <span>{res.release_date}</span>
              ) : (
                <span>{res.known_for_department}</span> || null
              )}
              <p>{res.overview}</p>
              {res.genre_ids ? (
                <div className="resGenres">
                  {res.genre_ids.map(id => {
                    return genres.map(genre =>
                      genre.id === id ? (
                        <button key={genre.id}>{genre.name}</button>
                      ) : null
                    );
                  })}
                </div>
              ) : res.known_for ? (
                <div className="resGenres">
                  {res.known_for.map(item => (
                    <div key={item.id} className="knownForBtn">
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
                          onClick={() =>
                            props.handler(item.media_type, item.id)
                          }
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
                    </div>
                  ))}
                </div>
              ) : null}

              <button
                className="itemBtn"
                onClick={() => props.handler(res.media_type, res.id)}
                tabIndex="0"
                onKeyDown={e =>
                  e.key === "Enter"
                    ? props.handler(res.media_type, res.id)
                    : null
                }
              >
                More
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default SearchDisplay;
