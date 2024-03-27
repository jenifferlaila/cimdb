import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { MovieCreateDTO } from "../../services/types";
import { Card, Typography, TextField, Paper } from "@mui/material";
import { Button } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/meta";
import { createMovie } from "../../services";

function NewMovie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdmin, token, user } = useSelector(
    (state: RootState) => state.user
  );

  const [movie, setMovie] = useState<MovieCreateDTO>({
    title: "",
    rating: 4,
    director: "",
    rating_count: 0,
    description: "",
    release_date: new Date(),
  });

  const [date, setDate] = useState(dayjs(new Date()));

  const disableSave = useMemo(
    () => Boolean(!movie.title.length && !movie.director.length),
    [movie.director.length, movie.title.length]
  );

  const handleSubmit = useCallback(async () => {
    if (!token || !user || !isAdmin) return;

    dispatch(setLoading(true));

    const res = await createMovie(token, {
      ...movie,
      release_date: date.toDate(),
    });
    dispatch(setLoading(false));

    if (res) navigate("/");
  }, [date, dispatch, isAdmin, movie, navigate, token, user]);

  useEffect(() => {
    if (!user || !isAdmin) return navigate("/", { replace: true });
  }, [isAdmin, navigate, user]);

  return (
    <>
      <Navbar />
      <Card
        sx={{
          gap: "2rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Typography variant="h3">Adicionar filme</Typography>

        <TextField
          sx={{ width: "40%" }}
          type="text"
          name="title"
          label="Titulo"
          variant="outlined"
          value={movie.title}
          onChange={({ target }) =>
            setMovie((curr) => ({ ...curr, title: target.value }))
          }
        />

        <TextField
          sx={{ width: "40%" }}
          type="text"
          name="director"
          label="Diretor"
          variant="outlined"
          value={movie.director}
          onChange={({ target }) =>
            setMovie((curr) => ({ ...curr, director: target.value }))
          }
        />

        <TextField
          multiline
          type="text"
          label="Descricao"
          name="description"
          variant="outlined"
          sx={{ width: "40%" }}
          value={movie.description}
          onChange={({ target }) =>
            setMovie((curr) => ({ ...curr, description: target.value }))
          }
        />

        <DatePicker value={date} onChange={(date) => date && setDate(date)} />

        <Paper
          sx={{
            boxShadow: "none",
            width: "50%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button type="submit" onClick={handleSubmit} disabled={disableSave}>
            Criar
          </Button>
        </Paper>
      </Card>
    </>
  );
}

export default NewMovie;
