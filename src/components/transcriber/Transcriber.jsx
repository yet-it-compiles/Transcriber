/**
 * @file AudioTranscriber.js
 *
 * @description This component is responsible for providing the transcription
 * functionality of the application along with the transcript animation to show
 * the actively playing word.
 *
 * @requires axios
 *
 * @exports Transcriber
 */

import React, { useState, useEffect } from "react";
import styles from "./transcriber.module.scss";
import axios from "axios";

/**
 * Callback function responsible for rendering the transcript
 *
 * @param {apiToken} param0 represents the api toekn for the transcription service
 * @param {fileData} param1 represents the audio file path to be transcribed
 * @param {currentTime} param2 represents the current time in the audio playback
 *
 * @returns {JSX.Element} That represnts the audio file transcripion
 */
const Transcriber = ({ apiToken, fileData, currentTime }) => {
  const [summary, setSummary] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [status, setStatus] = useState("Initializing Connection");

  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    const index = timestamps.findIndex(
      ({ start, end }) => start <= currentTime && end >= currentTime
    );
    setActiveWordIndex(index !== -1 ? index : activeWordIndex);
  }, [timestamps, currentTime]);

  const downloadTranscript = (transcript) => {
    const blob = new Blob([transcript.join("\n")], {
      type: "text/plain;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transcript.txt";
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const client = axios.create({
      baseURL: "https://api.assemblyai.com/v2",
      headers: {
        Authorization: apiToken,
      },
    });

    /**
     * The method is responsible for uploading the audio file to the transcription
     * service.
     *
     * @returns {Promise<string|null>} The URL of the uploaded audio file, or null
     * if there was an error.
     */
    const uploadFile = async () => {
      const url = "/upload";

      try {
        const response = await client.post(url, fileData, {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });

        if (response.status === 200) {
          return response.data.upload_url;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    };

    /**
     * Callback function responsible for transcribing the audio file and polling
     * the API until the transcription is available.
     *
     * @param {string} audioUrl - The URL of the audio file to be transcribed.
     *
     * @returns {Promise<object>} The audio files full transcription
     *
     * @throws {Error} If the transcription process fails.
     */
    const transcribeAudio = async (audioUrl) => {
      const url = "/transcript";
      const modelSelection = {
        audio_url: audioUrl,
        /* speakers_expected: 2, */
        auto_chapters: true,
        speaker_labels: true,
        sentiment_analysis: true,
        entity_detection: true,
        disfluencies: true,
      };

      try {
        const response = await client.post(url, modelSelection);
        const transcriptId = response.data.id;
        const pollingEndpoint = `/transcript/${transcriptId}`;

        const pollTranscription = async () => {
          try {
            const APIPollingResponse = await client.get(pollingEndpoint);
            const { status, utterances } = APIPollingResponse.data;

            switch (status) {
              case "completed":
                setStatus("✅ Transcription Completed!");
                const formattedTranscript = utterances.map(
                  (eachSpeaker) =>
                    `Speaker ${eachSpeaker.speaker}: ${eachSpeaker.text}`
                );
                setTranscript(formattedTranscript);
                downloadTranscript(formattedTranscript);

                const words = utterances.flatMap((utterance) =>
                  utterance.words.map((word) => ({
                    ...word,
                    speaker: utterance.speaker,
                  }))
                );

                setTimestamps(words);

                setSummary(APIPollingResponse.data);
                return;

              case "processing":
                setStatus("Your Transcript Is Processing");
                setTimeout(pollTranscription, 3000);
                break;

              case "error":
                setStatus("There was an error processing your transcript");
                throw new Error(
                  `Transcription failed: ${transcriptionResult.error}`
                );

              default:
                setTimeout(pollTranscription, 3000);
            }
          } catch (error) {
            setStatus(
              "There was an error trying to connect to the Transcriber."
            );
          }
        };

        setTimeout(pollTranscription, 2000);
      } catch (error) {
        setStatus("There was an error trying to transcribe the audio ");
      }
    };

    const displayChapters = async () => {
      try {
        const uploadUrl = await uploadFile();
        await transcribeAudio(uploadUrl);
      } catch (error) {}
    };

    displayChapters();
  }, [apiToken, fileData]);

  return (
    <>
      <p>
        Status: <strong>{status}</strong>
      </p>

      {transcript.map((eachLine, index) => {
        const words = eachLine.split(" ");
        return (
          <p key={index}>
            {words.map((word, wordIndex) => {
              const currentWordInfo = timestamps.find(
                ({ text }) => text.toLowerCase() === word.toLowerCase()
              );

              if (currentWordInfo) {
                return (
                  <span
                    key={wordIndex}
                    style={
                      currentTime * 1000 >= currentWordInfo.start &&
                      currentTime * 1000 < currentWordInfo.end
                        ? { color: "red" }
                        : { color: "white" }
                    }
                  >
                    {word + " "}
                  </span>
                );
              } else {
                return word + " ";
              }
            })}
          </p>
        );
      })}

      {summary?.chapters?.map((eachChapter, eachIndex) => (
        <div key={eachIndex}>
          <h2>Chapter {eachIndex++}:</h2>
          <p>- Summary: {eachChapter.summary}</p>
          <p>- Headline: {eachChapter.headline}</p>
          <p>- Gist: {eachChapter.gist}</p>
          <p>
            Start time: {eachChapter.start / 1_000}s || End time:{" "}
            {eachChapter.end / 1_000}s
          </p>
        </div>
      ))}
    </>
  );
};

export default Transcriber;
