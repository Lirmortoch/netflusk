export default function ProfileAvatar({hasAvatar, avatar, username}) {
  const avatarClass = `profile-tools__avatar ${hasAvatar ? 'image-avatar' : 'username-avatar'}`;
  return (
    <div className={avatarClass}>
      { hasAvatar ? <img src={`${avatar.tmdb.avatar_path}`} /> : `${username.slice(0,1)}` }
    </div>
  );
}