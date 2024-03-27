import { AppBar, IconButton, Toolbar } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import useNavbar from "./Navbar.hook";
import { MovieDTO } from "../../services/types";
import { Autocomplete } from "@mui/joy";

export type NavbarProps = {
  movies?: MovieDTO[];
};

function Navbar({ movies }: NavbarProps) {
  const { actions, homeAction } = useNavbar();

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: "1rem" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={homeAction}
        >
          <MovieFilterIcon />
        </IconButton>

        <Autocomplete
          freeSolo
          disabled={!movies}
          sx={{ width: "40%", mr: "auto" }}
          options={(movies ?? []).map(({ title }) => title)}
        />

        {actions}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
