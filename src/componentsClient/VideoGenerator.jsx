import React, { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import "@ffmpeg/core";

const VideoGenerator = ({ jsonData }) => {
  const [ffmpeg] = useState(createFFmpeg({ log: true }));
  const [loading, setLoading] = useState(true);
  const [videoURL, setVideoURL] = useState(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
        setLoading(false);
      }
    };
    loadFFmpeg();
  }, [ffmpeg]);

  const downloadFile = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const processFrames = async () => {
    const frameDuration = 3; // Each frame appears for 3 seconds
    let index = 1;

    // Create a list of promises to download images and add them to ffmpeg's memory
    const downloadPromises = jsonData.map(async (item) => {
      const imageName = `image${index}.jpg`;

      // Download image and save to ffmpeg memory
      const imageResponse = await fetch(item.imageLink);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], imageName, {
        type: "image/jpeg",
      });

      ffmpeg.FS("writeFile", imageName, await fetchFile(imageFile));
      index++;
    });

    // Wait for all images to be downloaded and stored in ffmpeg's memory
    await Promise.all(downloadPromises);

    return jsonData.length * frameDuration; // Total duration
  };

  const generateVideo = async () => {
    try {
      setLoading(true);
      const totalDuration = await processFrames();

      // Generate the video with FFmpeg
      await ffmpeg.run(
        "-framerate",
        "1",
        "-pattern_type",
        "glob",
        "-i",
        "image*.jpg", // Input pattern for images
        "-vf",
        "scale=1280:720,format=yuv420p", // Video filter (scaling and format)
        "-t",
        `${totalDuration}`, // Total duration of the video in seconds
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p", // Pixel format
        "output.mp4" // Output video file name
      );

      // Read the generated video file
      const data = ffmpeg.FS("readFile", "output.mp4");

      // Convert the file to a Blob and create a URL
      const videoBlob = new Blob([data.buffer], { type: "video/mp4" });

      // Set video URL and trigger download
      setVideoURL(URL.createObjectURL(videoBlob));
      downloadFile(videoBlob, "generated_video.mp4");

      setLoading(false);
    } catch (error) {
      console.error("Error generating video:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generateVideo} disabled={loading}>
        {loading ? "Processing..." : "Generate Video"}
      </button>
      {videoURL && <video controls src={videoURL} width="640" />}
    </div>
  );
};

export default VideoGenerator;
