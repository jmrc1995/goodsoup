import "./App.css";
import { loginUrl } from "./spotify";
import { useEffect, useState } from "react";
import Artists from "./components/Artists";
import Banner from "./components/Banner";
import Profile from "./components/Profile";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  const [topArtists, setTopArtists] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState("");

  useEffect(() => {
    const _spotifyToken = getTokenFromUrl().access_token;

    window.location.hash = "";

    if(_spotifyToken){
      setSpotifyToken(_spotifyToken)

      spotify.setAccessToken(_spotifyToken)

    }
  });

  const logout = () => {
    if (spotifyToken) {
      setSpotifyToken("");
    }
    window.localStorage.removeItem("token");
    window.location.hash = "";
    setTopArtists([]);
  };

  return (
    <div className="h-screen bg-navyBlue text-center">
      <header className="flex items-center justify-between text-white">
        {!spotifyToken ? (
          <a
            className="text-sm h-3/6 font-bold m-10 rounded border p-2"
            href={loginUrl}
          >
            Login to Spotify
          </a>
        ) : (
          <>
            <Profile className="flex flex-start w-full" token={spotifyToken} />

            <button
              className="text-sm h-3/6 font-bold m-10 rounded border p-2"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </header>
      <div className="bg-navyBlue">
        <Banner />
        {spotifyToken ? (
          <>
            <Artists
              topArtists={topArtists}
              setTopArtists={setTopArtists}
              token={spotifyToken}
            />
            {/* <RecentlyPlayed token={token}/> */}
          </>
        ) : (
          <h1 className="text-white font-montserrat flex flex-start m-10">
            {" "}
            Please Sign In ...{" "}
          </h1>
        )}
      </div>
    </div>
  );
}

export default App;
