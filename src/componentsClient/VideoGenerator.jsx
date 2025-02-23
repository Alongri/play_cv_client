import React, { useEffect, useState, useRef } from "react";
import { API_URL, doApiGet } from "../services/apiService";
import { useSelector } from "react-redux";

function VideoGenerator() {
  const IdVideo = useSelector((state) => state.myDetailsSlice.idVideo);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);  // מתחילים בטעינה
  const [error, setError] = useState(null);
  const [isConverting, setIsConverting] = useState(false);  // מצב המרה
  const canvasRef = useRef(null); // Ref ל-canvas

  useEffect(() => {
    if (IdVideo) {
      doApi();
    }
  }, [IdVideo]);

  const doApi = async () => {
    setLoading(true);
    let url = `${API_URL}/videos/childobjects/${IdVideo}`;
    try {
      let data = await doApiGet(url);
      let data_check = data.data;
      const filteredData = data_check.map(({ answer, imageLink }) => ({
        answer,
        imageLink,
      }));
      setItems(filteredData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const generateVideo = async () => {
    if (!canvasRef.current || items.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const fps = 30;
    const durationPerImage = 4; // שניות לכל תמונה
    const totalFrames = items.length * fps * durationPerImage;
    const stream = canvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    let chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      // המרת WebM ל-MP4 עם ייבוא דינמי
      setIsConverting(true);
      const ffmpeg = await import('@ffmpeg/ffmpeg');
      const { createFFmpeg, fetchFile } = ffmpeg;
      const ffmpegInstance = createFFmpeg({ log: true });
      await ffmpegInstance.load();
      ffmpegInstance.FS("writeFile", "video.webm", await fetchFile(blob));
      await ffmpegInstance.run("-i", "video.webm", "output.mp4");
      const mp4Data = ffmpegInstance.FS("readFile", "output.mp4");

      // יצירת קובץ MP4 להורדה
      const mp4Blob = new Blob([mp4Data], { type: "video/mp4" });
      const mp4Url = URL.createObjectURL(mp4Blob);

      const a = document.createElement("a");
      a.href = mp4Url;
      a.download = "video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setIsConverting(false);
    };

    mediaRecorder.start();
    let frame = 0;

    function drawFrame() {
      let imageIndex = Math.floor(frame / (fps * durationPerImage));

      if (imageIndex >= items.length) {
        mediaRecorder.stop();
        return;
      }

      const { answer, imageLink } = items[imageIndex];
      const img = new Image();
      img.src = imageLink;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // הוספת טקסט
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText(answer, 50, 550);

        frame++;
        requestAnimationFrame(drawFrame);
      };
    }

    drawFrame();
  };

  useEffect(() => {
    // ברגע שהנתונים נטענו, נתחיל את יצירת הסרטון
    if (!loading && items.length > 0) {
      generateVideo();
    }
  }, [loading, items]);

  return (
    <div className="container">
      {error && <div>Error: {error.message}</div>}
      {loading && <div>Loading...</div>}
      {isConverting && <div>Converting to MP4...</div>}
      <canvas ref={canvasRef} width={800} height={600} className="border my-4" />
    </div>
  );
}

export default VideoGenerator;