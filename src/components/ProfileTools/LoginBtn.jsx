import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createRequestToken } from "../../store/loginSessionReducer";

import { error } from "../../utils/logger";

export default function LoginBtn({ btnClassName }) {
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