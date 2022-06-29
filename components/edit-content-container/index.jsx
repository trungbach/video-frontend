/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { getDetailVideo, videoSelector } from "@/features/video";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import Link from "next/link";
import "node_modules/video-react/dist/video-react.css"; // import css
import React, { useEffect } from "react";
import LoadingComponent from "../LoadingComponent";
import FormQuestion from "./FormQuestion";
import styles from "./style.module.scss";

export default function EditMediaContainer({ id }) {
  const dispatch = useAppDispatch();
  const { detailVideo, pending } = useAppSelector(videoSelector);

  useEffect(() => {
    dispatch(getDetailVideo({ videoId: id }));
  }, [dispatch, id]);

  if (pending || !detailVideo) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.homeContainer}>
      <div className="row">
        <Link href="/manage-video">
          <a className={styles.button}>Back</a>
        </Link>
      </div>
      <div>
        <h1 className="mt-5 mb-4 ">Edit Video</h1>
      </div>

      <FormQuestion detailVideo={detailVideo} videoId={id} />
    </div>
  );
}
