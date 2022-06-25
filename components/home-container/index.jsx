/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { getVideos, videoSelector } from "@/features/video";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { formatTime } from "@/utils/index";
import { Input } from "antd";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent";
import styles from "./style.module.scss";

export default function HomeContainer() {
  const dispatch = useAppDispatch();
  const { listVideos, pending, error } = useAppSelector(videoSelector);
  const [videoName, setVideoName] = useState("");

  useEffect(() => {
    dispatch(getVideos({ page: 0, name: videoName }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoName]);

  // if (pending) {
  //   return <LoadingComponent />;
  // }

  if (error) {
    return "";
  }

  const renderListVideo = listVideos.map((item, index) => {
    console.log("item", item);
    return (
      // eslint-disable-next-line @next/next/link-passhref
      <Link href={`/media/${item.id}`} key={index}>
        <div className={`col-3 p-4 ${styles.hoverBorder}`}>
          <div style={{ border: "2px solid transparent" }}>
            <div style={{ position: "relative" }}>
              {/* <img style={{ width: "100%" }} src={item.avatar.originUrl} alt="" /> */}
              <video style={{ width: "100%" }} src={item.video.originUrl} />
              <div
                style={{
                  position: "absolute",
                  right: 7,
                  bottom: 7,
                  background: "#160d0d",
                  padding: 4,
                  borderRadius: 7,
                }}
              >
                {formatTime(item.time)}
              </div>
            </div>
            <div className="p-2">
              <div className="d-flex">
                <div>
                  <h3 style={{ color: "#fff", fontSize: 17 }}>{item.title}</h3>
                  <p style={{ color: "#ccc", marginTop: 8 }}>{item.author}</p>
                  <div className="d-flex">
                    <p style={{ color: "#ccc", fontSize: 13 }} className="me-3">
                      {item.numberView} views
                    </p>
                    <p style={{ color: "#ccc", fontSize: 13 }}>
                      {moment(item.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className={styles.homeContainer}>
      <div className="d-flex justify-content-between align-items-center">
        <Input
          style={{
            borderColor: "#ccc",
            color: "#ccc",
            backgroundColor: "transparent",
            borderRadius: "10px",
            width: 500,
            margin: "20px 0",
          }}
          placeholder="Search video by name..."
          onChange={(e) => setVideoName(e.target.value)}
          value={videoName}
        />
        <Link href="/add-content">
          <a className={styles.addContent}>Add Content</a>
        </Link>
      </div>
      <div className="row">{renderListVideo}</div>
    </div>
  );
}
