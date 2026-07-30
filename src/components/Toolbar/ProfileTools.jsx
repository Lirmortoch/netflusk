import { useSelector, useDispatch } from "react-redux";

export default function ProfileTools({}) {
  const dispatch = useDispatch();
  const { guestSession, status, error, } = useSelector(({ guestSession }) => guestSession);

  return (
    <div className="toolbar__profile-tools profile-tools">
      <div className="profile-tools__avatar">
        <img />
      </div>
    </div>
  );
}