import { Button, Card, IconButton } from "@mui/joy";
import { Navbar } from "../../components";
import useUser from "./User.hook";
import { Edit } from "@mui/icons-material";
import { TextField } from "@mui/material";

function User() {
  const { editMode, hasChanges, state, handleSubmit, setEditMode, setState } =
    useUser();

  return (
    <>
      <Navbar />

      <Card
        sx={{
          gap: "2rem",
          display: "flex",
          position: "relative",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: "2rem", right: "20%" }}
          variant={editMode ? "solid" : "plain"}
          onClick={() => setEditMode((curr) => !curr)}
        >
          <Edit />
        </IconButton>

        <Card
          sx={{
            gap: "2rem",
            width: "30%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            name="name"
            label="Nome"
            variant="standard"
            value={state.name}
            disabled={!editMode}
            sx={{ width: "100%" }}
            onChange={({ target }) =>
              setState((curr) => ({ ...curr, name: target.value }))
            }
          />

          <TextField
            name="username"
            label="Username"
            variant="standard"
            disabled={!editMode}
            value={state.username}
            sx={{ width: "100%" }}
            onChange={({ target }) =>
              setState((curr) => ({ ...curr, username: target.value }))
            }
          />

          <TextField
            type="email"
            name="email"
            label="Email"
            variant="standard"
            value={state.email}
            disabled={!editMode}
            sx={{ width: "100%" }}
            onChange={({ target }) =>
              setState((curr) => ({ ...curr, email: target.value }))
            }
          />

          <TextField
            label="Senha"
            type="password"
            name="password"
            variant="standard"
            disabled={!editMode}
            value={state.password}
            sx={{ width: "100%" }}
            onChange={({ target }) =>
              setState((curr) => ({ ...curr, password: target.value }))
            }
          />

          <Button
            sx={{ ml: "auto" }}
            disabled={!editMode && hasChanges}
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </Card>
      </Card>
    </>
  );
}

export default User;
