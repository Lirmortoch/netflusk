import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createRequestToken } from "../../store/loginSessionReducer";
import { error } from "../../utils/logger";

function LoginBtn({}) {
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const data = dispatch(createRequestToken());
      localStorage.setItem('tmdb_req_token', data.request_token);

      const approvalUrl = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${encodeURIComponent(window.location.origin + '/')}`;
      window.location.href = approvalUrl;
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
  const { guestSession, status, error, } = useSelector(({ guestSession }) => guestSession);
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