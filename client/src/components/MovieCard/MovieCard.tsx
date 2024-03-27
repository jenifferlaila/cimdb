import { Card, Typography, CardContent, Button } from "@mui/joy";

import { MovieDTO, UserRatingCreateDTO } from "../../services/types";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { rateMovie } from "../../services";
import { setLoading } from "../../store/meta";
import dayjs from "dayjs";

export type MovieCardProps = MovieDTO & {
  refetch: () => Promise<void>;
};

function MovieCard({
  id,
  title,
  director,
  release_date,
  rating,
  refetch,
}: MovieCardProps) {
  const { user, token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleRating = useCallback(
    async (_: unknown, value: number | null) => {
      if (!value || !user || !token) return;

      dispatch(setLoading(true));

      const rating: UserRatingCreateDTO = {
        movie: id,
        user: user.id,
        rating: value,
      };

      await rateMovie(token, rating);

      refetch();
      dispatch(setLoading(false));
    },
    [dispatch, id, refetch, token, user]
  );

  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg">
          {title} ({dayjs(release_date).format("YYYY")})
        </Typography>
        <Typography level="body-sm">{director}</Typography>
      </div>
      <CardContent orientation="horizontal">
        <Rating
          name={title}
          value={rating + 1}
          onChange={handleRating}
          disabled={!user || !token}
        />
        <Button
          disabled
          size="md"
          color="primary"
          variant="solid"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
        >
          Mais
        </Button>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
