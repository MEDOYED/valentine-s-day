import { useEffect, useRef } from "react";

interface VideoWithAlphaProps {
  src: string;
  className?: string;
}

export default function VideoWithAlpha({ src, className }: VideoWithAlphaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Детекція iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (!isIOS) {
      // На десктопі просто ховаємо canvas і показуємо відео
      canvas.style.display = "none";
      video.style.display = "block";
      return;
    }

    // На iOS ховаємо відео і малюємо на canvas
    video.style.display = "none";
    canvas.style.display = "block";

    const drawFrame = () => {
      if (video.paused || video.ended) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Малюємо відео на canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Отримуємо дані пікселів
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Обробляємо альфа-канал (білий -> прозорий)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Якщо піксель білий або майже білий - робимо прозорим
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // альфа = 0 (прозорий)
        }
      }

      ctx.putImageData(imageData, 0, 0);

      requestAnimationFrame(drawFrame);
    };

    video.addEventListener("play", drawFrame);
    video.play();

    return () => {
      video.removeEventListener("play", drawFrame);
    };
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        src={src}
      />
      <canvas ref={canvasRef} className={className} />
    </>
  );
}
