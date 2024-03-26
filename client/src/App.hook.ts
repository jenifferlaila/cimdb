import { useEffect } from "react";
import { getRoleByUserId, validateToken } from "./services";
import { useDispatch } from "react-redux";
import { setRole, setToken, setUser } from "./store/user";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { setLoading } from "./store/meta";

export default function useApp() {
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.meta.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = async () => {
      dispatch(setLoading(true));

      const [token, user] = await validateToken();

      dispatch(setUser(user));
      dispatch(setToken(token));

      dispatch(setLoading(false));
    };

    action();
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    const action = async () => {
      dispatch(setLoading(true));
      const role = await getRoleByUserId(user.id);

      dispatch(setRole(role));

      dispatch(setLoading(false));
    };

    action();
  }, [dispatch, user]);

  return { loading };
}
