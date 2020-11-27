import React, { useState, useEffect } from "react";
import instance from "./axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  
  useEffect(() => {
    async function fetchdata() {
      const req = await instance.get(fetchUrl);
      setMovies(req.data.results);
      return req;
    }
    fetchdata();
  }, [fetchUrl]);

  const opts = {
    height:'390',
    width:"100%",
    playerVars:{
      autoplay:1
    }
  }
  const handleClick = (movie) =>{
    if(trailerUrl){
      setTrailerUrl("")
    } else{
      console.log(movie)
      movieTrailer(movie?.name || movie?.origanl_name || "").then(url =>{
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"))
      }).catch(err=>console.log(err)); 
    }

  }
  return (
    <div className="row">
      <h2 className="row__title" >{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row_posterLarge"}`}
            onClick={()=>handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
            { trailerUrl && <Youtube videoId={trailerUrl} opts={opts}  /> }
    </div>
  );
}

export default Row;
