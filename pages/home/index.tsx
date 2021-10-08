import { useSession } from "next-auth/client";

import Intro from "../../components/home/Intro";
import Profile from "../../components/home/Profile";

const Home = () => {
  const [session, loading] = useSession();

  if (loading) {
    return null;
  }

  if (session) {
    return <Profile session={session} />;
  } else {
    return <Intro />;
  }
};

export default Home;
