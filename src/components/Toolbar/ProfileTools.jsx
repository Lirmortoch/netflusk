import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { createRequestToken, handleLogout } from "../../store/loginSessionReducer";
import Dropdown from "../ui/Dropdown/Dropdown";

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
    const optionsList = (
      <div>
        <ul className="profile-tools__list tools-list">
          <li className="tools-list__item">
            <a href="https://www.themoviedb.org/settings/account">Account Settings</a>
          </li>
          <li className="tools-list__item">
            <button onClick={() => dispatch(handleLogout)}>Logout</button>
          </li>
        </ul>
      </div>
    );

    elem = (
      <div className="profile-tools__wrap">
        <Dropdown
          dropdownBtn={{ classes: 'profile-tools-btn', text: <ProfileAvatar hasAvatar={loginSession?.avatar.tmdb.avatar_path !== null} avatar={loginSession?.avatar} username={loginSession.username} /> }}
          dropdownStyles="dropdown profile-tools"
          dropdownContentStyles="dropdown-styles-2 dropdown-styles-arrow"
          dropdownType='click'
          isSmart={true}
        >
          {optionsList}
        </Dropdown>
      </div>
    );
  }
  else if (loginStatus.includes('loading')) {
    elem = (
      <div className="loader"></div>
    );
  }

  return (
    <div className="toolbar__profile-tools profile-tools">
      {elem}
    </div>
  );
}