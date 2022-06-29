import { formatTime } from "@/utils/index";
import React from "react";
import styles from "./style.module.scss";

export default function VideoEvents({ detailVideo }) {
  const renderEvents = detailVideo.videoQuestions.map((item, index) => {
    return (
      <li key={index}>
        <h4>{formatTime(item.duration)}</h4>
        <p>
          {item.type === 0 ? "Multiple Choice" : item.type === 1 ? "Explain" : "One Correct Answer"}
        </p>
      </li>
    );
  });
  return (
    <div className={styles.videoEvent}>
      <h3>Video Events</h3>
      <ul>{renderEvents}</ul>
    </div>
  );
}
