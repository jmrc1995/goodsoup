import "./App.css";
import { loginUrl } from "./spotify";
import { useEffect, useState } from "react";
import Artists from "./components/Artists";
import Banner from "./components/Banner";
import Profile from "./components/Profile";

function App() {
  const [token, setToken] = useState("");
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;

    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
    console.log(token);
  }, []);

  const logout = () => {
    if (token) {
      setToken("");
    }
    window.localStorage.removeItem("token");
    window.location.hash = "";
    setTopArtists([]);
    console.log(token);
  };

  return (
    <div className="h-screen bg-navyBlue text-center">
      <header className="flex items-center justify-between text-white">
        {!token ? (
          <a
            className="text-sm h-3/6 font-bold m-10 rounded border p-2"
            href={loginUrl}
          >
            Login to Spotify
          </a>
        ) : (
          <>
            <Profile className="flex flex-start w-full" token={token} />

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
        {token ? (
          <Artists
            topArtists={topArtists}
            setTopArtists={setTopArtists}
            token={token}
          />
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
