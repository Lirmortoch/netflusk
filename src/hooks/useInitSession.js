import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { handleClearGuestSession, setGuestSession, createGuestSession } from "../store/guestSessionReducer";
import { handleRestoreSession } from "../store/loginSessionReducer";
import { getJSON } from "../utils/utils";

const useInitSession = () => {
  const dispatch = useDispatch();
  const initStarted = useRef(false);
  
  useEffect(() => {
    if (initStarted.current) return;
    if (window.location.pathname === '/auth/callback') return;
    initStarted.current = true;

    const initSession = async () => {
      const authed = await dispatch(handleRestoreSession());

      if (authed) {
        dispatch(handleClearGuestSession());
        return;
      }
      
      const savedGuestSession = getJSON('tmdb_guest_session');
      const expiresAt = savedGuestSession?.expires_at
        ? new Date(savedGuestSession.expires_at.replace(' UTC', 'Z').replace(' ', 'T'))
        : null;

      if (expiresAt && expiresAt > new Date()) {
        const payload = {
          guestSession: savedGuestSession,
          status: 'guestSession-succeeded',
          error: null,
        }
        dispatch(setGuestSession(payload));
      }
      else dispatch(createGuestSession());
    }

    initSession();
  }, [dispatch]);
}

export default useInitSession;