import { useState } from "react";
import Star from "../public/star-icon.svg";

function App() {
  const [Poster, setPoster] = useState();
  const [Title, setTitle] = useState();
  const [Year, setYear] = useState();
  const [Rated, setRated] = useState();
  const [Released, setReleased] = useState();
  const [Runtime, setRuntime] = useState();
  const [Genre, setGenre] = useState();
  const [Plot, setPlot] = useState();
  const [Actors, setActors] = useState();
  const [imdbrating, setImdbrating] = useState();
  const [error, setError] = useState(false);

  const getMovie = async (e) => {
    e.preventDefault();
    setError(false);

    const movie = e.target.elements.movie.value;
    const wait = await fetch(
      `http://www.omdbapi.com/?t=${movie}&apikey=ba8c1e41`
    );
    const data = await wait.json();
    if (data.Response == "True") {
      setPoster(data.Poster);
      setTitle(data.Title);
      setYear(data.Year);
      setRated(data.Rated);
      setReleased(data.Released);
      setRuntime(data.Runtime);
      setGenre(data.Genre);
      setPlot(data.Plot);
      setActors(data.Actors);
      setImdbrating(data.imdbRating);
    } else {
      setError(true);
      return;
    }
  };
  return (
    <div className="flex bg-black justify-center items-center h-screen">
      <div className="bg-indigo-900 rounded-md p-9">
        <form onSubmit={getMovie} className="grid grid-cols-2 gap-4">
          <input
            placeholder="Enter movie name here..."
            name="movie"
            className="bg-indigo-900 border h-12 border-neutral-200 rounded-md outline-none col-span-2 sm:col-span-1"
          ></input>
          <button className="bg-amber-400 rounded-md p-3">Search</button>
        </form>
        {error && (
          <div className="text-center mt-4 flex justify-center">
            <div className="flex flex-col justify-center items-center ml-4">
              <p className="text-red-700 font-medium mt-2">
                Oops! Invalid movie name :/
              </p>
            </div>
          </div>
        )}
        {Title && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <img src={Poster} alt="poster" className="w-full sm:w-1/2" />
            <div className="flex flex-col justify-center items-center sm:items-start">
              <div className="flex flex-col justify-center items-center">
                <p className="text-white font-medium mt-2">{Title}</p>
                <p className="text-white font-medium">{Year}</p>
                <p className="text-white font-medium">{Rated}</p>
                <p className="text-white font-medium flex flex-row">
                  <img
                    src={Star}
                    className="h-3 w-3 flex flex-row mt-1.5 mr-1"
                  />
                  {imdbrating}
                </p>
                <p className="text-white font-medium">{Released}</p>
                <p className="text-white font-medium">{Runtime}</p>
                <p className="text-white font-medium">{Genre}</p>
                <h3>Plot:</h3>
                <p className="text-white font-medium">{Plot}</p>
                <h3>Cast:</h3>
                <p className="text-white font-medium">{Actors}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
