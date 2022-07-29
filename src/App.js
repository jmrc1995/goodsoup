import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { loginUrl } from "./spotify";
import { useEffect, useState } from "react";
import axios from "axios";
import Artists from "./components/Artists";
import Banner from "./components/Banner";

function App() {

  const queryClient = new QueryClient()

  const [token, setToken] = useState("");
  // const [searchKey, setSearchKey] = useState("");
  // const [artists, setArtists] = useState([]);
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
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setTopArtists([]);
  };

  // const searchArtists = async (e) => {
  //   e.preventDefault();
  //   const { data } = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "artist",
  //     },
  //   });

  //   console.log(data);

  //   setArtists(data.artists.items);
  // };

  // const renderArtists = () => {
  //   return artists?.map((artist) => (
  //     <div key={artist.id}>
  //       {artist.images.length ? (
  //         <img width={"100%"} src={artist.images[0].url} alt="" />
  //       ) : (
  //         <div>No Image</div>
  //       )}
  //       {artist.name}
  //     </div>
  //   ));
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen bg-navyBlue text-center">
        <header className="flex justify-end text-white">
          {/* <h1 className="font-montserrat text-2xl font-bold ">Login to see your top 20</h1> */}
          {!token ? (
            <a
              className="text-sm font-bold m-2 rounded border p-2"
              href={loginUrl}
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

        {/* <div className="bg-navyBlue">
        <form className="text-white" onSubmit={searchArtists}>
          <input
            className="bg-transparent rounded border  "
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="text-white font-bold mx-2" type={"submit"}>
            Search
          </button>
        </form>

        {renderArtists()}
      </div> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
