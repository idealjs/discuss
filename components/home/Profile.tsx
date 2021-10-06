import { Session } from "next-auth";
import { signOut } from "next-auth/client";
import { useCallback } from "react";

interface IProps {
  session: Session;
}

const Profile = (props: IProps) => {
  const { session } = props;

  const onClick = useCallback(async () => {
    await fetch("api/users");
  }, []);

  return (
    <div>
      <div>Signed in as {session.user?.name}</div>
      <button onClick={() => signOut()}>Sign out</button>
      <button onClick={onClick}>req</button>
    </div>
  );
};

export default Profile;
