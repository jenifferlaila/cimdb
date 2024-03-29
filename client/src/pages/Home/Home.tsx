import { Sheet } from "@mui/joy";
import { Navbar } from "../../components";
import { MovieDTO } from "../../services/types";
import { useCallback, useEffect, useState } from "react";
import { setLoading } from "../../store/meta";
import { getAllMovies } from "../../services";
import { useDispatch } from "react-redux";
import { MovieGrid } from "../../components/MovieGrid";

function Home() {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState<MovieDTO[]>([]);

  const fetchMovies = useCallback(async () => {
    dispatch(setLoading(true));

    const movies = await getAllMovies();

    setMovies(movies ?? []);

    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      <Navbar movies={movies} />
      <Sheet>
        <MovieGrid movies={movies} refetch={fetchMovies} />
      </Sheet>
    </>
  );
}

export default Home;
