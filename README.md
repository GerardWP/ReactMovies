data.results[Array] {

title = title

image = poster_path - first bit of path is http://image.tmdb.org/t/p/
backdrop image = backdrop_path

release = release_date

plot = overview

lang = original_language

id = id

genre ids = genre_id [Array]

vote average = vote_average
number of votes = vote_count

}

https://api.themoviedb.org/3/discover/movie?api_key=###&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&vote_average.gte=6&with_genres=28
