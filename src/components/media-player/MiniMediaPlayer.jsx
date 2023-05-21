/**
 * @file MiniMediaPlayer.jsx
 *
 * @description
 *
 * @requires react
 * @requires wave.module.css
 *
 * @exports MiniMediaPlayer
 */

import { useRef, useEffect, useState } from "react";
import styles from "./wave.module.css";
import WaveSurfer from "wavesurfer.js";

const InteractiveAudioWave = () => {
  const waveformRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfer, setWavesurfer] = useState(null);

  const initializeWaveSurfer = () => {
    if (!waveformRef.current) return;
    const instance = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ddd",
      progressColor: "orange",
      cursorColor: "orange",
      barWidth: 2,
      barHeight: 2,
      responsive: true,
      height: 100,
    });
    setWavesurfer(instance);
  };

  useEffect(() => {
    initializeWaveSurfer();

    return () => {
      if (wavesurfer) {
        wavesurfer.destroy();
        setWavesurfer(null);
      }
    };
  }, []);

  useEffect(() => {
    if (!wavesurfer) return;

    wavesurfer.load(import.meta.env.VITE_FILE_PATH_1);

    wavesurfer.on("play", () => setIsPlaying(true));
    wavesurfer.on("pause", () => setIsPlaying(false));

    return () => {
      wavesurfer.un("play");
      wavesurfer.un("pause");
    };
  }, [wavesurfer]);

  const togglePlay = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  return (
    <div>
      <div ref={waveformRef} />
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default InteractiveAudioWave;
