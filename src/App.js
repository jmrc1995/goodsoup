import "./App.css";
import { loginUrl } from "./spotify";
import { useEffect, useState } from "react";
import Artists from "./components/Artists";
import Banner from "./components/Banner";

function App() {



  const [token, setToken] = useState("");
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    console.log(window.location.hash)
    let token = window.localStorage.getItem("token");
    console.log(window.localStorage)

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
  }, []);

  const logout = () => {
    
    if(token){
      setToken('')
    }

    window.localStorage.removeItem("token");
    window.location.hash="";
    setTopArtists([]);
    console.log(token)
  };


  return (
   
      <div className="h-screen bg-navyBlue text-center">
        <header className="flex justify-end text-white">
          {/* <h1 className="font-montserrat text-2xl font-bold ">Login to see your top 20</h1> */}
          {!token ? (
            <a
              className="text-sm font-bold m-2 rounded border p-2"
              href={!token&&loginUrl}
            >
              Login to Spotify
            </a>
          ) : (
            <button
              className="text-sm font-bold m-2 rounded border p-2"
              onClick={logout}
            >
              Logout
            </button>
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
          ) : null}

        
        </div>

      </div>

  );
}

export default App;
