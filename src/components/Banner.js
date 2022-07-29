import React from 'react'
import { useSpring, animated } from "react-spring";

function Banner() {

    const props = useSpring({
        to: { opacity: 1, x: 0 },
        from: { opacity: 0, x: 20000 },
        delay: 0,
      });
  return (
    <div>
     

        <animated.h1
            style={props}
            className="px-10 pt-10  underline-offset-8 flex items-start font-bold subpixel-antialiased tracking-wider font-montserrat text-white uppercase text-8xl"
          >
            Good Soup
          </animated.h1>

    </div>
  )
}

export default Banner