import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { createRequestToken } from "../../store/loginSessionReducer";
import { error } from "../../utils/logger";

function LoginBtn({}) {
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const data = await dispatch(createRequestToken()).unwrap();
      localStorage.setItem('tmdb_req_token', data);
      useNavigate(`/confirm-account/${data.request_token}`);
    }
    catch (err) {
      error(`Can't create request token: ${err}`);
      return err;
    }
  }

  return (
    <button onClick={handleLogin}>Login</button>
  );
}

export default function ProfileTools({}) {
  const dispatch = useDispatch();
  // const { guestSession, status, error, } = useSelector(({ guestSession }) => guestSession);
  const { loginSession, loginStatus, loginError, } = useSelector(({ loginSession }) => loginSession);

  let elem = <LoginBtn />;

  if (loginSession !== null && loginStatus === 'succeeded' && loginError === null) {
    elem = (
      <div className="profile-tools__wrap">
        <div className="profile-tools__avatar">
          <img />
        </div>

        
      </div>
    );
  }

  return (
    <div className="toolbar__profile-tools profile-tools">
      {elem}
    </div>
  );
}