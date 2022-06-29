/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { ROLE_STAFF, ROLE_USER } from "@/config/constant";
import { accountSelector } from "@/features/account";
import { getVideos, videoSelector } from "@/features/video";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { formatTime } from "@/utils/index";
import { Input, Select, Rate } from "antd";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
const { Option } = Select;
const categoryType = {
  computer_science: 0,
  general_education: 1,
  painting: 2,
  economics: 3,
  language: 4,
  literacy: 5,
  math: 6,
  algebra: 7,
  calculus: 8,
  geometry: 9,
};
export default function HomeContainer() {
  const dispatch = useAppDispatch();
  const { listVideos, error } = useAppSelector(videoSelector);
  const { user } = useAppSelector(accountSelector);
  const [videoName, setVideoName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getVideos({ page: 0, name: videoName, category }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoName, category]);

  const renderListVideo = listVideos.map((item, index) => {
    if (user?.role === ROLE_USER) {
      return (
        <Link passHref href={`/media/${item.id}`} key={index}>
          <div className={`col-3 p-4 ${styles.hoverBorder}`}>
            <div style={{ border: "2px solid transparent" }}>
              <div style={{ position: "relative" }}>
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
                <div className="d-flex justify-content-between">
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
                  <div>
                    <h4>{item.user.name}</h4>
                    <h5 className="mt-3">Rate Average: {item.rateAVG}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    return (
      <div key={index} className={`col-3 p-4 ${styles.hoverBorder}`}>
        <div style={{ border: "2px solid transparent" }}>
          <div style={{ position: "relative" }}>
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
            <div className="d-flex justify-content-between">
              <div>
                <h3 style={{ color: "#fff", fontSize: 17 }}>{item.title}</h3>
                <p style={{ color: "#ccc", marginTop: 8 }}>{item.author}</p>
                <div className="d-flex">
                  <p style={{ color: "#ccc", fontSize: 13 }} className="me-3">
                    {item.numberView} views
                  </p>
                  <p style={{ color: "#ccc", fontSize: 13 }}>{moment(item.createdAt).fromNow()}</p>
                </div>
              </div>
              <div>
                <h4>{item.user.name}</h4>
                <h5 className="mt-3">Rate Average: {item.rateAVG}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <div
          style={{
            width: 200,
            marginLeft: 20,
            marginRight: 20,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: 8 }}>Category: </span>
          <Select
            style={{ width: "100%" }}
            value={category}
            onChange={(value) => setCategory(value)}
          >
            <Option value={""}>All</Option>
            {Object.keys(categoryType).map((item, index) => {
              return (
                <Option key={index} value={item}>
                  {index === 0 ? "Computer Science" : index === 1 ? "General Education" : item}
                </Option>
              );
            })}
          </Select>
        </div>

        {user?.role === ROLE_STAFF && (
          <Link href="/add-content">
            <a className={styles.addContent}>Add Content</a>
          </Link>
        )}
      </div>
      <div className="row">{renderListVideo}</div>
    </div>
  );
}
