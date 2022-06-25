/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";

export default function VideoInput(props) {
  const { height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();
  const [sourceThumb, setSourceThumb] = React.useState();

  const handleFileVideo = (event) => {
    props.setVideoFile(event.target.files[0]);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleFileThumb = (event) => {
    props.setThumbFile(event.target.files[0]);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSourceThumb(url);
  };

  return (
    <div className="VideoInput">
      <div className="d-flex justify-content-around mb-4">
        <input
          ref={inputRef}
          className="VideoInput_input"
          type="file"
          onChange={handleFileVideo}
          accept=".mov,.mp4"
        />

        <input className="VideoInput_input" type="file" onChange={handleFileThumb} />
      </div>
      <div className="d-flex">
        {source && (
          <div className="width-50 d-flex justify-content-center">
            <video id="video" className="VideoInput_video" height={height} controls src={source} />
          </div>
        )}

        {sourceThumb && (
          <div className="d-flex justify-content-center">
            <img src={sourceThumb} style={{ marginLeft: "20px" }} width="40%" alt="file" />
          </div>
        )}
      </div>
    </div>
  );
}
