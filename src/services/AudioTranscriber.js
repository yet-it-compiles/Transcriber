/**
 * @file AudioTranscriber.js
 *
 * @description This file is responsible for handling the audio transcription
 * feature for the application.
 *
 * This is accomplished by being passed in a string containing the relative
 * URL file path to the audio clip to be transcribed. From here, AudioTranscriber
 * establishes a connection with the API and serves the audio file as a .wav
 * media file. The API then responds with an encrypted upload_url that allows
 * the secure transmission from the application to their server.
 * Finally, every few seconds AudioTranscriber polls the API to check its
 * transcription status. When it's 'ready' the transcript is caught and handled.
 *
 * @requires fs
 * @requires axios
 *
 * @exports
 */

import fs from "fs";
import axios from "axios";

const API_TOKEN = "24c03d99a3e447ebbfbb02e623b1d648";

// Function to upload a local file to the AssemblyAI API
async function uploadFile(apiToken, path) {
  const data = fs.readFileSync(path);
  const url = "https://api.assemblyai.com/v2/upload";

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization: apiToken,
      },
    });

    if (response.status === 200) {
      return response.data.upload_url;
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}

// Async function that sends a request to the AssemblyAI transcription API and retrieves the transcript
async function transcribeAudio(apiToken, audioUrl) {
  const headers = {
    authorization: apiToken,
    "content-type": "application/json",
  };

  // Send a POST request to the transcription API with the audio URL in the request body
  const response = await axios.post(
    "https://api.assemblyai.com/v2/transcript",
    {
      audio_url: audioUrl,
      speakers_expected: 2,
      auto_chapters: true,
      speaker_labels: true,
      sentiment_analysis: true,
      entity_detection: true,
      disfluencies: true,
    },
    { headers }
  );

  // Retrieve the ID of the transcript from the response data
  const transcriptId = response.data.id;

  // Construct the polling endpoint URL using the transcript ID
  const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

  let APIPollingResponse = null;

  // Poll the transcription API until the transcript is ready
  do {
    if (!APIPollingResponse) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Send a GET request to the polling endpoint to retrieve the status of the transcript
      APIPollingResponse = await axios.get(pollingEndpoint, { headers });
    }
    // Retrieve the transcription result from the response data
    const { status, utterances } = APIPollingResponse.data;

    switch (status) {
      // If the transcription is complete, return the transcript object
      case "completed":
        for (const { speaker, text } of utterances) {
          console.log(`Speaker ${speaker}: ${text}`);
        }
        return APIPollingResponse.data;
      case "processing":
        await new Promise((resolve) => setTimeout(resolve, 1000));
        APIPollingResponse = null;
        break;

      // If the transcription has failed, throw an error with the error message
      case "error":
        throw new Error(`Transcription failed: ${transcriptionResult.error}`);

      default:
        // If the transcription is still in progress, wait for a few seconds before polling again
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  } while (true);
}

async function main() {
  // Call the transcribeAudio function to start the transcription process
  const path = "src\\assets\\audio\\Two-People.wav";
  const uploadUrl = await uploadFile(API_TOKEN, path);

  const transcript = await transcribeAudio(API_TOKEN, uploadUrl);

  // Print the chapters
  console.log("Chapters:");
  transcript?.chapters?.forEach((chapter, index) => {
    console.log(`\nChapter ${index + 1}:`);
    console.log(`Summary: ${chapter.summary}`);
    console.log(`Headline: ${chapter.headline}`);
    console.log(`Gist: ${chapter.gist}`);
    console.log(`Start: ${chapter.start}`);
    console.log(`End: ${chapter.end}`);
  });
}

main();
