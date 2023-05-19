/**
 * @file AudioTranscriber.js
 *
 * @description This file is responsible for handling the audio transcription
 * feature
 *
 * @requires axios
 *
 * @exports Transcriber
 */

import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Responsible for rendering the transcript to the screen
 *
 * @param {apiToken} param0 represents the api toekn for the transcription service
 * @param {fileData} param1 represents the hardcoded file path to the audio
 * recording.
 *
 * @returns {JSX.Element} That represnts the transcripion of the audio file
 */
const Transcriber = ({ apiToken, fileData }) => {
  const [summary, setSummary] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [status, setStatus] = useState("Initializing Connection");

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
     * Transcribes the audio from the provided URL using the AssemblyAI service.
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
        speakers_expected: 2,
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
                setTranscript(
                  utterances.map(
                    (eachSpeaker) =>
                      `Speaker ${eachSpeaker.speaker}: ${eachSpeaker.text}`
                  )
                );

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
        setStatus("There was an error trying to connect to the Transcriber.");
      }
    };

    const main = async () => {
      try {
        const uploadUrl = await uploadFile();
        await transcribeAudio(uploadUrl);
      } catch (error) {}
    };

    main();
  }, [apiToken, fileData]);

  return (
    <>
      <p>
        Status: <strong>{status}</strong>
      </p>

      {transcript.map((eachLine, index) => (
        <p key={index}>{eachLine}</p>
      ))}

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

      {timestamps.map((word, index) => (
        <div key={index}>
          <h1>Timestamps! </h1>
          <p>
            Speaker {word.speaker}: {word.text}
          </p>
          <p>
            Start: {word.start / 1_000}s, End: {word.end / 1000}s
          </p>
          <p>Confidence: {word.confidence}</p>
        </div>
      ))}
    </>
  );
};

export default Transcriber;
