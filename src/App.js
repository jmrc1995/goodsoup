import "./App.css";
import { useEffect, useState } from "react";
import Artists from "./components/Artists";
import Banner from "./components/Banner";
import Profile from "./components/Profile";
import { getTokenFromUrl, loginUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  const [topArtists, setTopArtists] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState("");

  useEffect(() => {
    /* It will save the token to localStorage so that user won't have to sign in
     * again when he/she refresh the page */
    const localToken = localStorage.getItem("spotify-token");
    if (localToken) {
      setSpotifyToken(localToken);
      spotify.setAccessToken(localToken);
      window.location.hash = "";
      return;
    }

    const _spotifyToken = getTokenFromUrl().access_token;
    if (_spotifyToken) {
      localStorage.setItem("spotify-token", _spotifyToken);
      setSpotifyToken(_spotifyToken);
      spotify.setAccessToken(_spotifyToken);
    }
  });

  const logout = () => {
    setSpotifyToken("");
    localStorage.removeItem("spotify-token");
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
