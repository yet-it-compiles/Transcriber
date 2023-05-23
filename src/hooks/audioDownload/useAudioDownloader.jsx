/**
 * @customHook useAudioDownloader
 *
 * @description The custom hook is responsible for providing application wide
 * functionality to download an audio file to the users default download location.
 *
 * @returns {hook} That represents an audio downloaded
 */
import { useEffect, useState } from "react";

/**
 * @component useAudioDownloader
 *
 * @description Responsible for rendering the useAudioDownloader custom hook
 *
 * @returns {JSX.Element} That represents
 */
const useAudioDownloader = () => {
  const [audioBlobURL, setAudioBlobURL] = useState(null);

  /**
   * @useEffect
   *
   * @description useEffect hook that handles applying side effects when
   * audioBlobURL changes and when it does downloads the file.
   */
  useEffect(() => {
    if (audioBlobURL) {
      const link = document.createElement("a");
      link.href = audioBlobURL;
      link.download = "NEW!-audio.wav";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [audioBlobURL]);

  /**
   * @setStateFunction downloadAudio
   *
   * @description state updater function that handles updating the audioBlobURL
   */
  const downloadAudio = (audioBlobURL) => {
    setAudioBlobURL(audioBlobURL);
  };

  return downloadAudio;
};

export default useAudioDownloader;
