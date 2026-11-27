import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { createSession, getUserData, setLoginError } from '../../store/loginSessionReducer';
import { handleSetHasAuth } from '../../store/appReducer';

import Modal from '../ui/Modal/Modal';
import Loading from '../ui/Loading/Loading';

export default function AuthCallback({}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasStarted = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const finishAuth = async () => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const rawToken = localStorage.getItem('tmdb_req_token');   
    if (!rawToken) {
      setIsOpen(false);
      navigate('/');
      return;
    }

    const token = JSON.parse(rawToken);

    try {
      const session = await dispatch(createSession(token.request_token)).unwrap();

      if (!session.success) {
        throw new Error(`Can't create new session: ${session.error}`);
      }

      const user = await dispatch(getUserData(session.session_id)).unwrap();

      if (user.id) {
        localStorage.removeItem('tmdb_req_token');

        dispatch(handleSetHasAuth(true));
        dispatch(setLoginError(null));
        dispatch(handleClearGuestSession());
      }
      else dispatch(handleSetHasAuth(false));
    }
    catch (err) {
      dispatch(handleSetHasAuth(false));
      dispatch(createGuestSession());
      throw new Error(`Can't auth user: ${err.error}`);
    }
    finally {
      setIsOpen(false);
      navigate('/');
    }
  }
  const cleanupAuth = async () => {
    localStorage.removeItem('tmdb_req_token')
  }

  return (
    <Modal open={isOpen} modalClassName='loader-modal' >
      <Loading callback={finishAuth} cleanupFnc={cleanupAuth}>
        <div className='loader-1'></div>
      </Loading>
    </Modal>
  );
}