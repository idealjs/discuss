import { signIn, signOut, useSession } from "next-auth/client";
import { Fragment, useCallback } from "react";

export default function Component() {
  const [session, loading] = useSession();
  const onClick = useCallback(async () => {
    await fetch("api/users");
  }, []);
  if (session) {
    return (
      <Fragment>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={onClick}>req</button>
      </Fragment>
    );
  }
  return (
    <Fragment>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </Fragment>
  );
}
