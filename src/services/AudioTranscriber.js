/**
 * @file AudioTranscriber.js
 *
 * @description This file is responsible for handling the audio transcription
 * feature of the application.
 *
 * @requires fs
 * @requires axios
 *
 * @exports AudioTranscriber
 *
 * @TODO
 * - Dual channel transcription
 * - Exporting paragraphs and sentences
 * - Listing historical transcripts
 * - Deleteing transcripts from the API
 */

import fs from "fs/promises";
import axios from "axios";

/**
 * This class handles capturing and uploading the audio file to be transcribed
 *
 * This is accomplished by establishing connection with the API and pinging it
 * with the API token with an exepectation of a response. It then checks if the
 * response is 200, which indicates success else throw and error.
 *
 * @param {string} apiToken Encapsulated API key to use with the API
 * @param {string} path Relative path of the audio file to be transcribed
 */
export default class AudioTranscriber {
  constructor(apiToken, path) {
    this.apiToken = apiToken;
    this.path = path;
    this.client = axios.create({
      baseURL: "https://api.assemblyai.com/v2",
      headers: {
        Authorization: apiToken,
      },
    });
  }

  /**
   * The method is responsible for uploading the audio file to the transcription
   * service.
   *
   * @returns {Promise<string|null>} The URL of the uploaded audio file, or null
   * if there was an error.
   */
  async uploadFile() {
    const fileReader = await fs.readFile(this.path);
    const url = "/upload";

    try {
      const response = await this.client.post(url, fileReader, {
        headers: {
          "Content-Type": "application/octet-stream",
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

  /**
   * Transcribes the audio from the provided URL using the AssemblyAI service.
   *
   * @param {string} audioUrl - The URL of the audio file to be transcribed.
   * @returns {Promise<object>} The audio files full transcription
   * @throws {Error} If the transcription process fails.
   */
  async transcribeAudio(audioUrl) {
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
      const response = await this.client.post(url, modelSelection);

      const transcriptId = response.data.id;
      const pollingEndpoint = `/transcript/${transcriptId}`;
      let APIPollingResponse = null;

      while (true) {
        if (!APIPollingResponse) {
          await this.delay(2000);
          APIPollingResponse = await this.client.get(pollingEndpoint);
        }

        const { status, utterances } = APIPollingResponse.data;
        console.log("Transcribing...");

        switch (status) {
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
            await this.delay(3000);
            APIPollingResponse = null;
            break;

          case "error":
            throw new Error(
              `Transcription failed: ${transcriptionResult.error}`
            );

          default:
            await this.delay(3000);
        }
      }
    } catch (error) {
      throw new Error(`Transcription failed: ${error.message}`);
    }
  }

  /**
   * This method handles setting the delay for the API polling for a specified
   * number of milliseconds.
   *
   * @param {number} ms - The number of milliseconds to delay the polling.
   * @returns {Promise<void>} A promise that resolves after the delay.
   */
  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * The method acts as an entry point of the AudioTranscriber class, initiating
   * the audio file upload, along with the transcription process.
   *
   * @returns {Promise<void>} A promise that resolves after the transcription
   * has been completed.
   */
  async main() {
    try {
      const uploadUrl = await this.uploadFile();
      const transcript = await this.transcribeAudio(uploadUrl);

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
}
