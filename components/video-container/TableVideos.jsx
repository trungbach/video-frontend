/* eslint-disable @next/next/no-img-element */
import { deleteVideo } from "@/features/video";
import { useAppDispatch } from "@/hooks/index";
import { formatTime } from "@/utils/index";
import { Modal, Pagination } from "antd";
import moment from "moment";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./style.module.scss";

const { confirm } = Modal;

const PAGE_SIZE = 20;

export default function TableVideos({ listVideos }) {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [pageIndex, setPageIndex] = useState(1);
  const handleDelete = (videoId) => {
    confirm({
      title: "Are you sure want to delete this video?",
      onOk: () => {
        dispatch(deleteVideo({ id: videoId }));
      },
      onCancel: () => {},
    });
  };

  const renderVideos = listVideos.map((video, index) => {
    return (
      <tr className="row text-center" key={index}>
        <td className="col-1">{video.id}</td>
        <td className="col-2">{video.user.name}</td>
        <td className="col-2">{video.title}</td>
        <td className="col-1">{formatTime(video.time)}</td>
        <td className="col-1">{video.rateAVG}</td>
        <td className="col-1">{video.numberView}</td>
        <td className="col-2">{moment(video.createdAt).format("YYYY-MM-DD")}</td>
        <td className="col-2">
          <img
            onClick={() => router.push(`/edit-media/${video.id}`)}
            style={{ marginRight: 6, cursor: "pointer" }}
            width={30}
            src="/assets/image/ic_edit.png"
            alt=""
          />
          <img
            onClick={() => handleDelete(video.id)}
            style={{ cursor: "pointer" }}
            width={30}
            src="/assets/image/ic_delete.png"
            alt=""
          />
        </td>
      </tr>
    );
  });

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr className="text-center">
            <th className="col-1">ID</th>
            <th className="col-2">Owner</th>
            <th className="col-2">Title</th>
            <th className="col-1">Time</th>
            <th className="col-1">Rate AVG</th>
            <th className="col-1">Views</th>
            <th className="col-2">Created At</th>
            <th className="col-2">Action</th>
          </tr>
        </thead>
        <tbody>{renderVideos}</tbody>
      </table>

      <div className={styles.pagination}>
        <Pagination
          onChange={(page) => setPageIndex(page)}
          defaultCurrent={pageIndex}
          total={3}
          pageSize={PAGE_SIZE}
        />
      </div>
    </div>
  );
}
