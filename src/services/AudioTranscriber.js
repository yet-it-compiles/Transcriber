/**
 * @file AudioTranscriber.js
 *
 * @description This file is responsible for handling the audio transcription
 * feature of the application.
 *
 * This is accomplished by first capturing the relative path of the audio file
 * and establishing a connection with the API to serve the file in .wav format.
 * The API first responds with an encrypted upload_url that allows ensures
 * the secure transmission from the application to their server.
 * Finally, every few seconds AudioTranscriber polls the API to check its
 * transcription status. When it's 'ready' the transcript is caught and
 * displayed in the console to the user.
 *
 * @requires fs
 * @requires axios
 *
 * @TODO
 * - Dual channel transcription
 * - Exporting paragraphs and sentences
 * - Listing historical transcripts
 * - Deleteing transcripts from the API
 */

import fs from "fs";
import axios from "axios";

const API_TOKEN = import.meta.env.VITE_AUTHORIZATION_1;

/**
 * This function handles capturing and uploading the audio file to be transcribed
 *
 * This is accomplished by establishing connection with the API and pinging it
 * with the API token with an exepectation of a response. It then checks if the
 * response is 200, which indicates success else throw and error.
 *
 * @param {string} apiToken Encapsulated API key to use with the API
 * @param {string} path Relative path of the audio file to be transcribed
 */
async function uploadFile(apiToken, path) {
  const fileReader = fs.readFileSync(path);
  const url = "https://api.assemblyai.com/v2/upload";

  try {
    const response = await axios.post(url, fileReader, {
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

// Sends a request to the transcription API and retrieves the transcript
async function transcribeAudio(apiToken, audioUrl) {
  const headers = {
    authorization: apiToken,
    "content-type": "application/json",
  };

  // Send a POST request to the transcription API with the audio URL
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

  // Retrieves the ID of the transcript from the response data
  const transcriptId = response.data.id;

  // Constructs the polling endpoint URL using the transcript ID
  const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

  let APIPollingResponse = null;

  /**
   * Constructs the polling endpoint URL and polls it every
   */
  do {
    if (!APIPollingResponse) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Send a GET request to the polling endpoint to retrieve the status
      APIPollingResponse = await axios.get(pollingEndpoint, { headers });
    }
    // Retrieve the transcription result from the response data
    const { status, utterances } = APIPollingResponse.data;
    console.log("Transcribing...");

    switch (status) {
      // If the transcription is complete, return the transcript object
      case "completed":
        for (const { speaker: eachSpeaker, text } of utterances) {
          if (eachSpeaker == "A") {
            console.log("");
          }
          console.log(`Speaker ${eachSpeaker}: ${text}`);
        }
        console.log("\n ===| Transcription Has Completed |===");

        return APIPollingResponse.data;
      case "processing":
        await new Promise((resolve) => setTimeout(resolve, 2000));
        APIPollingResponse = null;
        break;

      // If the transcription has failed, throw an error with the error message
      case "error":
        throw new Error(`Transcription failed: ${transcriptionResult.error}`);

      default:
        // If the transcription is still in progress, wait 3 secs and try again
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  } while (true);
}

/**
 * Summary - A one paragraph summary of the content spoken during this timeframe
 *
 * Headline - A single sentence summary of the content spoken during this
 * timeframe
 *
 * Gist- An ultra-short summary, just a few words, of the content spoken during
 * this timeframe
 *
 * Starting timestamp (in milliseconds) of the portion of audio being summarized
 * Ending timestamp (in milliseconds) of the portion of audio being summarized
 */
async function main() {
  try {
    const path = "src/assets/audio/Two-People.wav";
    const uploadUrl = await uploadFile(API_TOKEN, path);
    const transcript = await transcribeAudio(API_TOKEN, uploadUrl);

    console.log("\nSummary Information");

    transcript?.chapters?.forEach((eachChapter, index) => {
      console.log(`\nChapter ${index + 1}:`);
      console.log(`\t- Summary: ${eachChapter.summary}\n`);
      console.log(`\t- Headline: ${eachChapter.headline}\n`);
      console.log(`\t- Gist: ${eachChapter.gist}\n`);
      console.log(
        `Start time: ${eachChapter.start}ms || End time: ${eachChapter.end}ms`
      );
    });
  } catch (error) {
    console.error(error.message);
  }
}

main();
