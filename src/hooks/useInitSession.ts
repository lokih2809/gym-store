// hooks/useInitSession.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSession } from "next-auth/react";
import { setUser } from "@/app/redux/slices/sessionSlice";

export const useInitSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        dispatch(setUser(session.user));
      }
    };

    fetchSession();
  }, [dispatch]);
};
