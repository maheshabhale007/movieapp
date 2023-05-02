import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './components/MovieCard';

// apiKey = 96db1a70

const API_URL = 'http://www.omdbapi.com?apikey=96db1a70';

const movie1 = 
{
    "Title": "Batman",
    "Year": "1989",
    "imdbID": "tt0096895",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDNjOGNhN2UtNmNhMC00YjU4LWEzMmUtNzRkM2RjN2RiMjc5XkEyXkFqcGdeQXVyMTU0OTM5ODc1._V1_SX300.jpg"
}


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch (`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
        console.log(data.Search);
    }

    useEffect(() => {
        searchMovies('Batman');
    }, []);

    return (
    <div className='app'>
        <h1>MovieLand</h1>

        <div className="search">
            <input placeholder='Search for movies' value={searchTerm} onChange={(e) => setsearchTerm(e.target.value)} />
            <img 
                src={SearchIcon} 
                alt="search" 
                onClick={() => searchMovies(searchTerm)}  
            />
        </div>

        {
            movies?.length > 0
            ? (
                <div className="container">
                    {/* <MovieCard movie1={movies[4]} /> */}
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
        }

        {/* <div className="container">
            <MovieCard movie1={movies[4]} />            

            <div className="movie">
                <div>
                    <p>{movie1.Year}</p>
                </div>
                <div>
                    <img src={movie1.Poster !== 'N/A' ? movie1.Poster : 'https://via.placeholder/400'} alt={movie1.Title} />
                </div>
                <div>
                    <span>{movie1.Type}</span>
                    <h3>{movie1.Title}</h3>
                </div>
            </div>
        </div> */}
    </div>
    )
}

export default App
