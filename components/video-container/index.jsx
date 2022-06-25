/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import TableVideos from "./TableVideos";
import { Input, Select } from "antd";
import { getVideos, videoSelector } from "@/features/video";

const { Option } = Select;
export default function VideoContainer() {
  const dispatch = useAppDispatch();
  const { listVideos, deleteSuccess } = useAppSelector(videoSelector);
  const [videoName, setVideoName] = useState("");
  const [type, setType] = useState("rate");

  useEffect(() => {
    dispatch(getVideos({ page: 0, name: videoName, type }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoName, deleteSuccess, type]);

  return (
    <div className={styles.homeContainer}>
      <div className="row">
        <Link href="/home">
          <a className={styles.button}>Back</a>
        </Link>
        <Input
          style={{
            borderColor: "#ccc",
            color: "#ccc",
            backgroundColor: "transparent",
            borderRadius: "10px",
            width: 500,
            margin: "0 20px",
          }}
          placeholder="Search video by name..."
          onChange={(e) => setVideoName(e.target.value)}
        />
      </div>
      <div>
        <div className="mt-5 d-flex align-items-center justify-content-between">
          <h1 className="mt-5 mb-4 ">Manage Videos</h1>
          <div className="d-flex align-items-center me-5">
            <span style={{ marginRight: 10, fontSize: 15 }}>Sort by: </span>
            <Select value={type} onChange={(value) => setType(value)}>
              <Option value={"rate"}>Rate</Option>
              <Option value={"view"}>View</Option>
            </Select>
          </div>
        </div>
        <TableVideos listVideos={listVideos} />
      </div>
    </div>
  );
}
