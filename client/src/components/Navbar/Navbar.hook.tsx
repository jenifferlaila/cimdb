import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { Avatar, Button, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { AdminPanelSettings } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/user";
import { deleteToken } from "../../services";

export default function useNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  const handleClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const homeAction = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    dispatch(setUser(null));
    dispatch(setToken(null));

    deleteToken();
  }, [dispatch]);

  const actions = useMemo(() => {
    if (!user) {
      return <Button onClick={handleClick}>Login</Button>;
    }

    return (
      <>
        {isAdmin && (
          <>
            <Dropdown>
              <MenuButton
                sx={{ color: "inherit" }}
                startDecorator={<AdminPanelSettings />}
                variant="plain"
              >
                Administrar
              </MenuButton>
              <Menu>
                <MenuItem onClick={() => navigate("/movie/new")}>
                  Adicionar filme
                </MenuItem>
              </Menu>
            </Dropdown>
          </>
        )}

        <Dropdown>
          <MenuButton sx={{ color: "inherit" }} variant="plain">
            <Avatar alt={user.name} src={user.avatar ?? undefined} />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => navigate("/user")}>Editar perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Dropdown>
      </>
    );
  }, [handleClick, handleLogout, isAdmin, navigate, user]);

  return { actions, homeAction };
}
