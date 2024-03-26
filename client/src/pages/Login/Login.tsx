import { Button, Card, Sheet } from "@mui/joy";
import { Paper, TextField, Typography } from "@mui/material";
import { UserLoginCredentialsDTO } from "../../services/types";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { login, saveToken } from "../../services";
import { setLoading } from "../../store/meta";
import { setToken, setUser } from "../../store/user";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // todo use react-hook-form for validation and lifecycle
  const [state, setState] = useState<UserLoginCredentialsDTO>({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(async () => {
    dispatch(setLoading(true));

    const res = await login(state.email, state.password);
    if (!res) return dispatch(setLoading(false));

    const { token, ...user } = res;
    saveToken(token);

    dispatch(setUser(user));
    dispatch(setToken(token));

    dispatch(setLoading(false));

    return navigate("/", { replace: true });
  }, [dispatch, navigate, state.email, state.password]);

  return (
    <Sheet
      sx={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          gap: "2rem",
          width: "70%",
          display: "flex",
          alignItems: "center",
          height: "fit-content",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">Realizar login</Typography>

        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          value={state.email}
          onChange={({ target }) =>
            setState((curr) => ({ ...curr, email: target.value }))
          }
        />

        <TextField
          label="Senha"
          type="password"
          name="password"
          variant="outlined"
          value={state.password}
          onChange={({ target }) =>
            setState((curr) => ({ ...curr, password: target.value }))
          }
        />

        <Paper
          sx={{
            boxShadow: "none",
            width: "40%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="plain">Cadastre-se</Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!state.email.length || state.password.length < 6}
          >
            Login
          </Button>
        </Paper>
      </Card>
    </Sheet>
  );
}

export default Login;
