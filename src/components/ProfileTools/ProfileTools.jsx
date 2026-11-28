import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import LoginBtn from './LoginBtn';
import Loader1 from "../ui/Loaders/Loader1";

const OptionList = lazy(() => import("./OptionList.jsx"));

export default function ProfileTools({}) {
  const { loginSession, loginStatus, loginError, } = useSelector(({ loginSession }) => loginSession);

  let elem = <LoginBtn btnClassName={'profile-tools__login-btn'} />;

  if (loginSession !== null && loginStatus === 'user-succeeded' && loginError === null) {
    elem = (
      <Suspense fallback={<Loader1 />}>
        <OptionList />
      </Suspense>
    );
  }
  else if (loginStatus.includes('loading')) {
    elem = <Loader1 />;
  }

  return (
    <div className="toolbar__profile-tools profile-tools">
      {elem}
    </div>
  );
}