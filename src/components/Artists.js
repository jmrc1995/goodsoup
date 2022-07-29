import { useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import AudioPlayer from "../AudioPlayer";


function Artists({ topArtists, setTopArtists, token }) {
  const props = useSpring({
    to: { opacity: 1, x: 0 },
    from: { opacity: 0, x: 20000 },
    delay: 300,
  });

  const props2 = useSpring({
    to: { opacity: 1, x: 0 },
    from: { opacity: 0, x: 20000 },
    delay: 600,
  });

  useEffect(() => {
    const myArtists = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTopArtists(data.items);
      console.log(data.items);
    };

    myArtists();
    console.log(myArtists());
  }, []);


  return (
    <>
      {topArtists.length > 0 && (
        <>
          <animated.h1
            style={props}
            className="px-10 pt-10 underline underline-offset-8 flex items-start font-normal subpixel-antialiased tracking-wider font-montserrat text-white uppercase text-sm"
          >
            Most Listend
          </animated.h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {topArtists?.map((track, index) => (
              <animated.div
                style={props2}
                className="bg-transparent flex flex-col items-center p-10 "
                key={track.id}
              >
                {track.album.images.length ? (
                  <img
                    className="rounded-lg shadow-2xl"
                    // width={"100%"}
                    src={track.album.images[0].url}
                    alt=""
                  />
                ) : (
                  <div>No Image</div>
                )}
                <AudioPlayer preview={track.preview_url}/>


                <h1 className="font-montserrat font-bold text-white uppercase text-2xl pt-2">
                  {index + 1 + ". " + track.name}
                </h1>
                <h2 className="font-montserrat font-normal text-white uppercase">
                  {track.artists[0].name}
                </h2>

                {track.popularity > 65 ? (
                  <div className="flex items-center">
                    <span className="font-serif font-normal text-white  text-sm">
                      Good Soup: {track.popularity}%
                    </span>
                    <BsHandThumbsUp color="green" size={20} />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="font-montserrat font-normal text-white  text-sm">
                      Bad Soup : {track.popularity}%
                    </span>

                    <BsHandThumbsDown color="red" size={20} />

                    
                  </div>
                )}

                

                {/* <span className="font-bold text-white uppercase">{track.name}</span> */}
              </animated.div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Artists;
