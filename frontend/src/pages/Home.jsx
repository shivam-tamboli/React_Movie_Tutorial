import MovieCard from "../components/MovieCard"

function Home() {
    const movies = [
        {id: 1, title: "John Wick", release_date: "2020"},
        {id: 2, title: "Terminator", release_date: "1999"},
        {id: 3, title: "John Cena", release_date: "2002"},
        {id: 4, title: "Titanic", release_date: "2022"},
        {id: 5, title: "Superman", release_date: "2001"},
        {id: 6, title: "Batman vs Superman", release_date: "1997"}

    ]

    const handleSearch = () => {

    }

    return (
    <div className="home">

        <form onSubmit={handleSearch} className="search-form">
            <input type="text" 
            placeholder="Search for movies....."
             className="search-input"></input>
             <button type="submit" className="search-button">Search</button>
        </form>
        <div className="movies-grid">
            {movies.map(movie => (<MovieCard  movie={movie} key={movie.id}/>))}
        </div>
    </div>
    );
}

export default Home