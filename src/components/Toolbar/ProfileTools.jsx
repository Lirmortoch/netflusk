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

function ProfileAvatar({hasAvatar, avatar, username}) {
  const avatarClass = `profile-tools__avatar ${hasAvatar ? 'image-avatar' : 'username-avatar'}`;
  return (
    <div className={avatarClass}>
      { hasAvatar ? <img src={`${avatar.tmdb.avatar_path}`} /> : `${username.slice(0,1)}` }
    </div>
  );
}

export default function ProfileTools({}) {
  const dispatch = useDispatch();
  const { loginSession, loginStatus, loginError, } = useSelector(({ loginSession }) => loginSession);

  let elem = <LoginBtn btnClassName={'login-btn'} />;
  
  if (loginSession !== null && loginStatus === 'user-succeeded' && loginError === null) {
    elem = (
      <div className="profile-tools__wrap">
        <ProfileAvatar hasAvatar={loginSession?.avatar.tmdb.avatar_path !== null} avatar={loginSession?.avatar} username={loginSession.username} />

        
      </div>
    );
  }

  return (
    <div className="toolbar__profile-tools profile-tools">
      {elem}
    </div>
  );
}