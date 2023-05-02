/**
 * @file AudioRecorder.jsx
 *
 * @description This module is responsible for allowing the application to connect
 * to the users microphone, and provide them the ability to play, pause, skip,
 * and adjust the volume of the applications audio playback.
 *
 * @requires react
 * @requires MediaRecorder
 *
 * @exports AudioRecorder
 */

import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
    useMemo,
} from "react";

/**
 * Handles the functionality to allow the user to record audio from their mic,
 * and playback the recording, and download it as a .wav file.
 *
 * This is accomplished by initializing the dynamic values of the recording
 * features, and then request audio recording permissions from the browser. The
 * function has many performance improvements, that help with both memory
 * consumption and rerendering.
 *
 * @returns {JSX.Element} representing an audio recorder
 */
const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioBlobURL, setAudioBlobURL] = useState(null);
    const mediaStreamRef = useRef();
    const mediaRecorderRef = useRef();
    const audioRef = useRef();

    /**
     * Requests access to the browsers microphone, and sets the primary mic as
     * the requested target. Once the data is retrieved, we efficiently chunk
     * it and assign it an object URL
     */
    const startRecording = useCallback(async () => {
        try {
            // Ensures the audio is captured directly from the microphone
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { capture: true },
            });
            mediaStreamRef.current = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const chunks = [];
            mediaRecorder.ondataavailable = ({ data }) => chunks.push(data);

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks);
                setAudioBlob(blob);
                setAudioBlobURL(URL.createObjectURL(blob));
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Failed to start recording:", error);
            setIsRecording(false);
        }
    }, []);

    /**
     * Callback that handles the ability to let a user stop the recording by
     * accessing the mediaRecorderRef switching its value to false.
     */
    const stopRecording = useCallback(() => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    }, []);

    /**
     * Callback that handles the ability for the user to play the recording by
     * using the audioBlobURL to create an audio element.
     */
    const playRecording = useCallback(() => {
        if (!audioBlobURL) return;
        const audio = audioRef.current || new Audio();
        audio.src = audioBlobURL;
        audio.onerror = (event) => console.error("Error playing audio:", event);
        audio.play();
        audioRef.current = audio;
    }, [audioBlobURL]);

    /**
     * Callback that handles the ability for the user to download the URL by
     * creating a new URL object from the audioBlob and returns it.
     */
    const downloadURL = useCallback(() => {
        if (!audioBlob) return null;
        return URL.createObjectURL(audioBlob);
    }, [audioBlob]);

    /**
     * memorized callback that handles the ability to download the recording
     * by creating an anchor with the audio URL.
     */
    const downloadRecording = useMemo(() => {
        if (!audioBlob) return null;
        return () => {
            const link = document.createElement("a");
            link.href = downloadURL();
            link.download = "audioRecording.wav";
            link.click();
        };
    }, [audioBlob, downloadURL]);

    useEffect(() => {
        return () => {
            if (
                mediaRecorderRef.current &&
                mediaRecorderRef.current.state !== "inactive"
            ) {
                mediaRecorderRef.current.stop();
            }
            if (mediaStreamRef.current) {
                mediaStreamRef.current
                    .getTracks()
                    .forEach((track) => track.stop());
            }
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, []);

    return (
        <>
            <button onClick={startRecording} disabled={isRecording}>
                {isRecording ? "Recording..." : "Start Recording"}
            </button>

            <button onClick={stopRecording} disabled={!isRecording}>
                Stop Recording
            </button>

            <button onClick={playRecording} disabled={!audioBlobURL}>
                Play Recording
            </button>

            <button onClick={downloadRecording} disabled={!audioBlob}>
                Download
            </button>

            {audioBlobURL && (
                <audio
                    ref={audioRef}
                    src={audioBlobURL}
                    onError={(event) =>
                        console.error("Error playing audio:", event)
                    }
                />
            )}
        </>
    );
};

export default AudioRecorder;
