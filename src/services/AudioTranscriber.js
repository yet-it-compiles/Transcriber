/**
 * @file
 *
 * @description This file contains a class called AudioTranscriber, which uses
 * the axios and fs packages to upload and transcribe an audio file using the
 * AssemblyAI API.
 *
 * @requires Axios
 * @requires fs/promises
 */

import axios from "axios";
import fs from "fs/promises";

const ASSEMBLY_API_URL = "https://api.assemblyai.com/v2";
const POLL_INTERVAL_MS = 5000;

export default class AudioTranscriber {
  constructor(apiKey) {
    this.assembly = axios.create({
      baseURL: ASSEMBLY_API_URL,
      headers: {
        authorization: apiKey,
        "transfer-encoding": "chunked",
      },
    });
  }

  async uploadAndTranscribeAudioFile(filePath) {
    try {
      const fileData = await fs.readFile(filePath);
      console.log("Uploading audio file...");

      const {
        data: { upload_url },
      } = await this.assembly.post("/upload", fileData);
      console.log("Starting transcription...");

      const {
        data: { id },
      } = await this.assembly.post("/transcript", {
        audio_url: upload_url,
      });
      console.log("Polling transcription status...");
      await this.pollTranscriptionStatus(id);
    } catch (error) {
      console.error(error);
    }
  }

  async pollTranscriptionStatus(transcriptionId) {
    try {
      const {
        data: { status, text },
      } = await this.assembly.get(`/transcript/${transcriptionId}`);

      switch (status) {
        case "queued":
        case "processing":
          console.log("Transcription status: queued");
          await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
          await this.pollTranscriptionStatus(transcriptionId);
          break;
        case "completed":
          console.log("Transcription status: completed");
          console.log("Transcript:", text);
          break;
        default:
          console.error(`Transcription failed with status: ${status}`);
          break;
      }
    } catch (error) {
      console.error("Failed to poll transcription status", error);
    }
  }
}
