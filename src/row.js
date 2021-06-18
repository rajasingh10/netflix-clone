import React, { useState, useEffect } from "react";
import "./Row.css"
import YouTube from "react-youtube"; 
import movieTrailer from "movie-trailer";

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_API = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl ,isLargeRow}) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl] = useState("");

  useEffect(() => {
    fetch(BASE_URL + fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results);
      });
  }, [fetchUrl]);

  /* youtube video */ 

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie)=>{
        if(trailerUrl){
          setTrailerUrl("");
        }
        else{
          movieTrailer(movie?.original_title || "")
             .then((url) => {
               const urlParams = new URLSearchParams(new URL(url).search);
               setTrailerUrl(urlParams.get("v"));
             })
             .catch((error)=> console.log(error));

        }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onClick={()=> handleClick(movie)}
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_PosterLarge"}`}
            src={IMG_API + (isLargeRow?movie.poster_path:movie.backdrop_path)}
            alt={movie.title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
      
    </div>
  );
};

export default Row;
