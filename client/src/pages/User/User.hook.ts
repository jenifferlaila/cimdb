import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserUpdateDTO } from "../../services/types";
import { getFullUser, updateUser } from "../../services";
import { setLoading } from "../../store/meta";

export default function useUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.user);

  const [hasChanges, setChanges] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [state, setState] = useState<UserUpdateDTO>({});

  const fetchUserInfo = useCallback(
    async (token: string) => {
      setChanges(false);
      dispatch(setLoading(true));
      const res = await getFullUser(token);

      if (!res) {
        setEditMode(false);
        return dispatch(setLoading(false));
      }

      setState(res);
      dispatch(setLoading(false));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(async () => {
    if (!token) return;

    dispatch(setLoading(true));

    const res = await updateUser(token, state);

    if (res) await fetchUserInfo(token);

    dispatch(setLoading(false));
  }, [dispatch, fetchUserInfo, state, token]);

  useEffect(() => {
    if (!user || !token) return navigate("/");

    fetchUserInfo(token);
  }, [fetchUserInfo, navigate, token, user]);

  useEffect(() => {
    if (state.password && state.password.length) return setChanges(true);

    const entries = Object.entries(state);

    for (const [key, val] of entries) {
      if (val && user && user[key as keyof typeof user] === val)
        return setChanges(true);
    }

    setChanges(false);
  }, [state, user]);

  return { editMode, state, hasChanges, handleSubmit, setEditMode, setState };
}
