import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSession } from "next-auth/react";
import { setUser } from "@/app/redux/slices/sessionSlice";

export const useInitSession = () => {
  const dispatch = useDispatch();

  const fetchSession = async () => {
    const session = await getSession();
    if (session) {
      dispatch(setUser(session.user));
    }
  };

  useEffect(() => {
    fetchSession();
  }, [dispatch]);

  return { fetchSession };
};
