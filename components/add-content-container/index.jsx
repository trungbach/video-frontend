/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { videoSelector } from "@/features/video";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./style.module.scss";
import "node_modules/video-react/dist/video-react.css"; // import css
import VideoInput from "./VideoInput";
import FormQuestion from "./FormQuestion";
import { useUploadFile } from "@/hooks/useUploadFile";
import { useEffect } from "react";

export default function MediaContainer() {
  const dispatch = useAppDispatch();
  const { newVideo } = useAppSelector(videoSelector);

  const [videoFile, setVideoFile] = useState();
  const [videoResponse] = useUploadFile(videoFile);

  return (
    <div className={styles.homeContainer}>
      <div className="row">
        <Link href="/home">
          <a className={styles.button}>Back</a>
        </Link>
      </div>
      <div>
        <h1 className="mt-5 mb-4 ">Upload your videos</h1>

        <div>
          <VideoInput videoFile={videoFile} setVideoFile={setVideoFile} width={400} height={300} />
        </div>
      </div>

      <FormQuestion videoResponse={videoResponse} />
    </div>
  );
}
