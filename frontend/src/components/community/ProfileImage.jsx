import { getAvatar } from "../../utils/tools";

function ProfileImage({ user, alt, className }) {
  return (
    <img
      src={getAvatar(user)}
      alt={alt}
      className={`tw-rounded-full ${className} tw-bg-white`}
    />
  );
}

export default ProfileImage;
