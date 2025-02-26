import React, { useState, useEffect } from "react";
import SpotifyLogin from "../components/SpotifyLogin";
import LoadingAnimation from "../components/LoadingAnimation";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // 2 Sekunden Animation
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-3xl mt-10">🎵 Music Quiz</h1>
      {loading ? <LoadingAnimation /> : <SpotifyLogin />}
    </div>
  );
};

export default Home;
