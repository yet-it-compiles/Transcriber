import axios from "axios";
import fs from "fs";

let theTranscripter = {
    id: "",
    uploadURL: "",
    transcript: "",
};

const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: import.meta.env.VITE_AUTHORIZATION_1,
        "transfer-encoding": "chunked",
    },
});

/* @TODO - Retrieve the proper path  */
let file = "src/components/audioRecording.wav";

fs.readFile(file, (err, data) => {
    if (err) return console.error(err);

    assembly
        .post("/upload", data)
        .then((res) => {
            if (res.data && res.data.upload_url) {
                theTranscripter.uploadURL = res.data;
                /* CAPTURES */
                console.log(
                    "THIS IS THE FIRST RETURN:",
                    res.data,
                    " HERE IS THE OBJ ",
                    theTranscripter
                );
            } else {
                throw new Error("Failed to upload audio file");
            }
        })
        .then(() => {
            const assembly = axios.create({
                baseURL: "https://api.assemblyai.com/v2",
                headers: {
                    authorization: import.meta.env.VITE_AUTHORIZATION_1,
                },
            });

            console.log("Starting transcription");

            const { upload_url } = theTranscripter.uploadURL;
            theTranscripter.uploadURL = upload_url;

            if (theTranscripter.uploadURL) {
                assembly
                    .post("/transcript", {
                        audio_url: theTranscripter.uploadURL,
                    })
                    // Capture the ID
                    .then((res) => {
                        console.log("SHOULD GET ID: ", res.data); // Assign the ID to followUp object
                        theTranscripter.id = res.data;
                        const { id } = theTranscripter.id;

                        theTranscripter.id = id;
                        setTimeout(checkStatus, 5000); // Start polling the status
                    })
                    .catch((err) => console.error(err));
            } else {
                throw new Error("Upload response missing required data");
            }
        })
        .catch((err) => console.error(err));
});

const checkStatus = () => {
    assembly
        .get(`/transcript/${theTranscripter.id}`) // Change the object reference
        .then((res) => {
            const { status, text } = res.data;
            if (status === "queued" || status === "processing") {
                console.log("Transcription status: queued");
                setTimeout(checkStatus, 5000); // Poll every 5 seconds
            } else if (status === "completed") {
                console.log("Transcription status: completed");
                theTranscripter.transcript = text;
                console.log(typeof theTranscripter.transcript);
            } else {
                console.error(`Transcription failed with status: ${status}`);
            }
        })
        .catch((err) => {
            console.error("Failed to check transcription status", err);
        });
};
