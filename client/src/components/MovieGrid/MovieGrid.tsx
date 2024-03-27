import { Sheet } from "@mui/joy";
import { MovieDTO } from "../../services/types";
import { MovieCard } from "../MovieCard";

export type MovieGridProps = {
  movies?: MovieDTO[];
  refetch: () => Promise<void>;
};

function MovieGrid({ movies = [], refetch }: MovieGridProps) {
  return (
    <Sheet
      sx={{
        gap: "2rem",
        padding: "1rem",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {movies.map((m) => (
        <MovieCard {...m} refetch={refetch} />
      ))}
    </Sheet>
  );
}

export default MovieGrid;
