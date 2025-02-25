import React, { useEffect, useState, useRef } from "react";
import { API_URL, doApiGet } from "../services/apiService";
import { useSelector } from "react-redux";

function VideoGenerator() {
  const IdVideo = useSelector((state) => state.myDetailsSlice.idVideo);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

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
    const durationPerImage = 4;
    const stream = canvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    let chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "video.webm";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
    if (!loading && items.length > 0) {
      generateVideo();
    }
  }, [loading, items]);

  return (
    <div className="container">
      {error && <div>Error: {error.message}</div>}
      {loading && <div>Loading...</div>}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border my-4"
      />
    </div>
  );
}

export default VideoGenerator;
