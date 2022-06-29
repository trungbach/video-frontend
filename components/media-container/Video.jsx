import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import styles from "./style.module.scss";
export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
        player.on("update", () => {
          console.log("update");
        });
      }));
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video
        onTimeUpdate={props.onTimeUpdate}
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
};
export default VideoJS;
