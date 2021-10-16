import { useCallback } from "react";

interface IProps {}

const Profile = (props: IProps) => {
  const {} = props;

  const onClick = useCallback(async () => {
    await fetch("api/users");
  }, []);

  return (
    <div>
      <button onClick={onClick}>Sign out</button>
      <button onClick={onClick}>req</button>
    </div>
  );
};

export default Profile;
