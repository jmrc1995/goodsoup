import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';


function Profile({ token }) {

    const [ profile, setProfile ] = useState([])

    useEffect(() => {
        const myProfile = async () => {
            console.log(token)
  
          const { data } = await axios.get(
            "https://api.spotify.com/v1/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfile(data.display_name);
          console.log(profile)
        
        };
       
        myProfile();
      }, []);
    


  return (
    <div>

        <h1 className="text-xl text-white font-montserrat flex flex-start m-10">
            {profile}
        </h1>
        
    </div>
  )
}

export default Profile