import { useSession, signIn, signOut } from "next-auth/client";
import { Fragment } from "react";

export default function Component() {
  const [session, loading] = useSession();
  if (session) {
    return (
      <Fragment>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
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
