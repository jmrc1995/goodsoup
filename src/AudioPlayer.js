import React, { useRef, useState } from "react";
import { BsPlay, BsPause, BsStop } from "react-icons/bs"

export default function AudioPlayer( { preview }) {
  const audioPlayer = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);

  const play = () => {
    audioPlayer.current.play();
  };

  const pause = () => {
    audioPlayer.current.pause();
  };

  const stop = () => {
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;
  };


  const onPlaying = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    setSeekValue(
      (audioPlayer.current.currentTime / audioPlayer.current.duration) * 100
    );
  };
  return (
    <div className="App">
      <audio
        src={preview}
        ref={audioPlayer}
        onTimeUpdate={onPlaying}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <br />
      {/* <p>{currentTime}</p> */}
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={seekValue}
        onChange={(e) => {
          const seekto = audioPlayer.current.duration * (+e.target.value / 100);
          audioPlayer.current.currentTime = seekto;
          setSeekValue(e.target.value);
        }}
      />
      <div>
        <button 
            className="text-3xl text-white"
            onClick={play}><BsPlay/></button>
        <button 
            className="text-3xl text-white"
            onClick={pause}><BsPause/></button>
        <button 
            className="text-3xl text-white"
            onClick={stop}><BsStop/></button>
      </div>
    </div>
  );
}
