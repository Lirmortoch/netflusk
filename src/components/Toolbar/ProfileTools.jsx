import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { createRequestToken } from "../../store/loginSessionReducer";

import { error } from "../../utils/logger";

function LoginBtn({ btnClassName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const data = await dispatch(createRequestToken()).unwrap();
      navigate(`/confirm-account/${data.request_token}`);
    }
    catch (err) {
      error(`Can't create request token: ${err}`);
      return err;
    }
  }

  return (
    <button className={btnClassName} onClick={handleLogin}>Login</button>
  );
}

export default function ProfileTools({}) {
  const dispatch = useDispatch();
  // const { guestSession, status, error, } = useSelector(({ guestSession }) => guestSession);
  const { loginSession, loginStatus, loginError, } = useSelector(({ loginSession }) => loginSession);

  let elem = <LoginBtn btnClassName={'login-btn'} />;

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