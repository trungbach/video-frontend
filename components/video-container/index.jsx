/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import TableVideos from "./TableVideos";
import { Input, Select } from "antd";
import { getVideos, videoSelector } from "@/features/video";
import { accountSelector, getUser } from "@/features/account";
import { ROLE_ADMIN, ROLE_STAFF } from "@/config/constant";

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

export default function VideoContainer() {
  const dispatch = useAppDispatch();
  const { listVideos, deleteSuccess } = useAppSelector(videoSelector);
  const { user } = useAppSelector(accountSelector);
  const [videoName, setVideoName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("rate");
  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (user) {
      if (user.role === ROLE_STAFF) {
        dispatch(getVideos({ page: 0, name: videoName, type, ownerId: user.id, category }));
      } else {
        dispatch(getVideos({ page: 0, name: videoName, type, category }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoName, deleteSuccess, type, category, user]);

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
            {/* <span style={{ marginRight: 10, fontSize: 15 }}>Category: </span> */}

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
          </div>
        </div>
        <TableVideos listVideos={listVideos} />
      </div>
    </div>
  );
}
