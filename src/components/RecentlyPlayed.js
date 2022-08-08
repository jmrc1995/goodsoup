import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

function RecentlyPlayed( { token }) {

  const [recentPlayed, setRecentPlayed] = useState([]);

  useEffect(() => {
    const recentlyPlayed = async () => {
        console.log(token)

      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setRecentPlayed(data);
      console.log(recentPlayed)
    
    };
   
    recentlyPlayed();
  }, []);


  return (
    <div>RecentlyPlayed</div>
  )
}

export default RecentlyPlayed